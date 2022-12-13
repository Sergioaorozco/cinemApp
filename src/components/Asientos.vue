<template>
  <div>
      <h1 class="mt-10 font-bold text-3xl py-3 bg-slate-200 rounded text-slate-800 text-center">Screen</h1>
      <section>
        <ul class=" grid grid-cols-4 justify-evenly	mt-32 gap-8">
          <li @click="handleSit" :id="sit.id" v-for="sit in availSits" :key="sit.id" :class="{'bg-lime-600': sit.available, 'bg-red-600': !sit.available, 'disabled': sit.acquired}" class="text-center py-2 px-24 cursor-pointer font-bold text-white rounded">{{sit.id}}</li>
        </ul>
        <div class="flex gap-6 mt-12 justify-center">
          <button @click="savePosition" type="button" class="py-3 px-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
            <svg  v-if="loading" aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            Guardar
          </button>
          <button class="py-3 px-10 bg-slate-500 hover:bg-slate-700 transition-all text-white rounded-md" @click="releaseSits">Liberar</button>
        </div>
      </section>
  </div>
</template>

<script>
import { getDatabase, ref, set, push, child, onValue } from "firebase/database";
export default {
  created() {
    const dbRef = ref(getDatabase());
    this.id = push(child(ref(getDatabase()), '/users')).key
    console.log(this.id)
    const starCountRef = child(dbRef, '/rooms/1/sits')
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        this.availSits = data
    })
    // get(child(dbRef, '/rooms/1/sits')).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     this.availSits = snapshot.val()
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
  },
  data() {
    return  {
      id : '',
      availSits : [],
      loading : false
    }
  },
  methods: {
    handleSit(event) {
      let selectedSit = this.availSits.find(item => item.id === event.target.id)
      try {selectedSit.available = !selectedSit.available }
      catch(err) { console.log(err) }
    },
    updatesSits() {
      const db = getDatabase();
      set(ref(db,'/rooms/1'), {
        sits:this.availSits
      })
      this.loading = false
    },
    savePosition(){
        this.loading = true
        this.updatesSits();
    },
    releaseSits() {
      this.availSits.forEach(element => {
        element.acquired = false
        element.available = true
      });
        this.updatesSits();
    }

  }
}

</script>

<style scoped>

</style>
