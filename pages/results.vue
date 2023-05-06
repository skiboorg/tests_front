<template>
  <section v-if="!is_auth" class="flex align-items-center justify-content-center flex-column h-100-vh">
    <div class="container ">
      <form @submit.prevent="handleSubmit()" class="w-full p-fluid surface-card py-8 px-5 sm:px-8 " style="border-radius: 53px">


        <div  class="">


          <label for="email" class="block text-600 text-sm  mb-2">Логин</label>
          <InputText id="email"
                     type="text"
                     class="w-full md:w-30rem mb-3 "

                     v-model="login" />


          <label for="password" class="block text-600 text-sm  mb-2">Пароль</label>

          <Password id="password" v-model="password"
                    class="w-full mb-3"

                    inputClass="w-full"
          />

          <Button label="Войти"  type="submit" class="w-full p-3 text-xl mb-2 md:mb-3"></Button>

        </div>
      </form>
    </div>
  </section>
  <section v-else>
    <div class="container ">
      <DataTable :value="results" tableStyle="min-width: 50rem" class="mb-5">
        <Column field="age" header="Возраст"></Column>
        <Column field="gender" header="Пол"></Column>
        <Column field="speciality" header="Специальность"></Column>
        <Column field="city" header="Город"></Column>
        <Column field="test1" header="Результаты теста1"></Column>
        <Column field="test2" header="Результаты теста2"></Column>
        <Column field="test3" header="Результаты теста3"></Column>
      </DataTable>
      <div class="">
        <p class="text-3xl">Общая информация о тестировании</p>
        <p class="text-2xl">Тест1</p>
        <p>У {{parseFloat(results_total.test1_1).toFixed(2)}}% пользователей слабовыраженная социофобия</p>
        <p>У {{parseFloat(results_total.test1_2).toFixed(2)}}% пользователей достаточно выраженная социофобия</p>
        <p>У {{parseFloat(results_total.test1_3).toFixed(2)}}% пользователей сильная социофобия</p>
        <p>У {{parseFloat(results_total.test1_4).toFixed(2)}}% пользователей очень сильная социофобия</p>

        <p class="text-2xl">Тест2</p>
        <p>У {{parseFloat(results_total.test2_1).toFixed(2)}}% пользователей страх негативной оценки в норме и не выражен ярко</p>
        <p>У {{parseFloat(results_total.test2_2).toFixed(2)}}% пользователей страх негативной оценки сильно выражен и мешает спокойному (нормированному социальному взаимодействию)</p>

        <p class="text-2xl">Тест3</p>
        <p>У {{parseFloat(results_total.test3_1).toFixed(2)}}% пользователей уровень социальной тревожности низкий</p>
        <p>У {{parseFloat(results_total.test3_2).toFixed(2)}}% пользователей уровень социальной тревожности умеренный</p>
        <p>У {{parseFloat(results_total.test3_3).toFixed(2)}}% пользователей уровень социальной тревожности высокий</p>
        <p>У {{parseFloat(results_total.test3_4).toFixed(2)}}% пользователей уровень социальной тревожности очень высокий</p>

      </div>
        <div class="text-center mb-6"><Button :loading="loading" @click="getClusters" label="Провести кластерный анализ"/></div>

        <div v-if="clusters">
          <div class="grid">
            <div class="col-12 text-center">
              <p class="font-bold text-primary">Паутинообразная диаграмма</p>
              <img :src="APIURL+'/media/total.png'" alt="">
            </div>
            <div class="col-12 text-center">
              <p class="font-bold text-primary">Паутинообразная диаграмма для теста 1</p>
              <img :src="APIURL+'/media/test1.png'" alt="">
            </div>
            <div class="col-12 text-center">
              <p class="font-bold text-primary">Паутинообразная диаграмма для теста 2</p>
              <img :src="APIURL+'/media/test2.png'" alt="">
            </div>
            <div class="col-12 text-center">
              <p class="font-bold text-primary">Паутинообразная диаграмма для теста 3</p>
              <img :src="APIURL+'/media/test3.png'" alt="">
            </div>
          </div>




        </div>
    </div>
  </section>
</template>
<script setup>
const runtimeConfig = useRuntimeConfig();
const APIURL = runtimeConfig.public.APIURL
const login = ref(null)
const password = ref(null)
const clusters = ref(null)
const is_auth = ref(false)
const loading = ref(false)
const handleSubmit = () => {
  if (login.value === 'admin' && password.value === 'admin'){
    is_auth.value = true
  }
}

const { data:results } = await useAsyncData(
    'results',
    () => $fetch(`${APIURL}/api/data/test`)
)
const { data:results_total } = await useAsyncData(
    'results_total',
    () => $fetch(`${APIURL}/api/data/calc_result`)
)

const getClusters = async () => {
  loading.value = !loading.value
  const { data } = await useFetch(`${APIURL}/api/data/calc`)
  console.log(data.value)
  clusters.value = true
  loading.value = !loading.value
}
</script>