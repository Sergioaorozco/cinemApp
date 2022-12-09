<template>
  <div>
      <h1 class="mt-10 font-bold text-3xl py-3 bg-slate-200 rounded text-slate-800 text-center">Screen</h1>
      <section>
        <ul class=" grid grid-cols-4 justify-evenly	mt-32 gap-8">
          <li @click="handleSit" :id="sit.id" v-for="sit in availSits" :key="sit.id" :class="{'bg-lime-600': sit.availabe, 'bg-red-600': !sit.availabe}" class="text-center py-2 px-24 cursor-pointer font-bold text-white rounded">{{sit.id}}</li>
        </ul>
      </section>
  </div>
</template>

<script>
import { getDatabase, ref, set, get, child } from "firebase/database";
export default {
  created() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, '/rooms/1/sits')).then((snapshot) => {
      if (snapshot.exists()) {
        this.availSits = snapshot.val()
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  },
  data() {
    return  {
      availSits : []
    }
  },
  methods: {
    handleSit(event) {
      let selectedSit = this.availSits.find(item => item.id === event.target.id)
      selectedSit.availabe = !selectedSit.availabe
      this.updatesSits();
    },
    updatesSits() {
      const db = getDatabase();
      set(ref(db,'/rooms/1'), {
        sits:this.availSits
      })
    }
  }
}

</script>

<style scoped>

</style>
