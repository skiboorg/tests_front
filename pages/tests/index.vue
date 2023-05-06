<template>
  <section class="flex align-items-center justify-content-center flex-column h-100-vh">
    <div class="container ">
      <h1 class="text-center text-primary">Заполните данные и выберите тест</h1>
      <div class="grid form">
        <div class="col-12 md:col-6">
            <p>Ваш возраст</p>
            <InputNumber  :min="16" :max="70" v-model="user_data.age" />
        </div>
        <div class="col-12 md:col-6">
          <p>Ваш пол</p>
          <div class="flex flex-wrap gap-3">
            <div class="flex align-items-center">
              <RadioButton v-model="user_data.gender" inputId="gender1"  value="Муж" />
              <label for="gender1" class="ml-2">Мужской</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="user_data.gender" inputId="gender2"  value="Жен" />
              <label for="gender2" class="ml-2">Женский</label>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-6">
          <p>Ваша профессия</p>
          <InputText   v-model="user_data.speciality" />
        </div>
        <div class="col-12 md:col-6">
          <p>Ваш город</p>
          <InputText  v-model="user_data.city" />
        </div>
      </div>
      <div class="test-row">
        <p >1. Шкала социальной тревожности Либовица</p>
        <Button label="Начать" :disabled="!can_start " @click="startTest(1)"/>
      </div>
      <div class="test-row">
        <p >2. Шкала Страх негативной оценки (BFNE-S)</p>
        <Button  label="Начать" :disabled="!can_start " @click="startTest(2)"/>
      </div>
      <div class="test-row ">
        <p >3. Тест на уровень социальной тревожности (Степанько А.Н.)</p>
        <Button  label="Начать" :disabled="!can_start " @click="startTest(3)"/>
      </div>
    </div>
  </section>
</template>
<script setup>
const router = useRouter()
const runtimeConfig = useRuntimeConfig();
const APIURL = runtimeConfig.public.APIURL

let session_id = localStorage.getItem('session_id')
let complete_tests = localStorage.getItem('complete_tests')
const user = useState('user', () => {})


onBeforeMount(()=>{
  if (!session_id){
    session_id = uuidv4()
    localStorage.setItem('session_id',session_id)
    localStorage.setItem('complete_tests','')
  }
})

const user_data = ref({
  "age":user.value?.age ? user.value?.age : null,
  "gender":user.value?.gender ? user.value.gender : null,
  "speciality":user.value?.speciality ? user.value.speciality : null,
  "city":user.value?.city ? user.value.city : null,
  "session_id":session_id
})

const can_start = computed (()=>{
  return user_data.value.age && user_data.value.gender && user_data.value.speciality && user_data.value.city
})


const uuidv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
const startTest = async (test_id) => {
  try {
    await $fetch( `${APIURL}/api/data/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user_data.value)
    } );
  }catch (e) {
    
  }
  
  user.value = user_data.value
  router.push(`/tests/${test_id}`)

}
</script>
<style lang="sass">
.test-row
  display: grid
  grid-template-columns: 3fr 1fr
  margin-bottom: 10px
  grid-gap: 10px
  p
    font-size: 20px
.form
  max-width: 700px
  margin: 0 auto
  margin-bottom: 20px
</style>