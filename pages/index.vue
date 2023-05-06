<template>
<section class="flex align-items-center justify-content-center flex-column h-100-vh">
  <div class="container ">
    <h1 class="text-center text-primary">Добро пожаловать в психологическое исследование социальной тревожности!</h1>
    <p class="text-2xl text-center">
      Социальная тревожность - это состояние дискомфорта и беспокойства, которое возникает в социальных ситуациях, таких как общение с незнакомыми людьми или страх быть оцененным.
      <br>
      Тестирование полностью анонимно. Прохождение теста займет всего 15 минут."
    </p>
    <div class="text-center">
      <Button label="Начать тестирование" @click="$router.push('/tests')"/>
    </div>

  </div>


</section>
</template>
<style lang="sass">
.container
  max-width: 1024px
  margin: 0 auto
  padding: 0 10px
.h-100-vh
  height: 100vh
</style>