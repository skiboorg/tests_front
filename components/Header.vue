<template>
  <div class="border-bottom-1 py-2 text-center">
    <Button link>
      <nuxt-link to="/">Главная</nuxt-link>
    </Button>
    <Button link>
      <nuxt-link to="/tests">Тесты</nuxt-link>
    </Button>
    <Button link>
      <nuxt-link to="/results">Результаты</nuxt-link>
    </Button>


  </div>
</template>
<style lang="sass">
html, body
  padding: 0
  margin: 0
a
  text-decoration: unset
  &:visited
    color: inherit
</style>