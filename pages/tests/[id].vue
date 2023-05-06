<template>
  <section class="flex align-items-center justify-content-center flex-column h-100-vh">
    <div v-if="!show_result" class="container ">
      <h1 class="text-center text-primary">{{tests[test_id-1].test_name}}</h1>
      <ProgressBar
          :value="parseInt(parseInt(tests[test_id-1].current_question_index+1) / parseInt(tests[test_id-1].questions.length) * 100)"/>
      <p>Вопрос {{tests[test_id-1].current_question_index+1}} / {{tests[test_id-1].questions.length}}</p>
      <p>{{tests[test_id-1].questions[tests[test_id-1].current_question_index].name}}</p>
      <p>Выберите ответ</p>
      <div class="flex flex-wrap gap-3 mb-3">
        <div class="flex align-items-center"
             v-for="(item,index) in tests[test_id-1].questions[tests[test_id-1].current_question_index].answers" :key="index">
          <RadioButton v-model="tests[test_id-1].questions[tests[test_id-1].current_question_index].selected_answer"
                       :inputId="`q-${index}`"
                       :value="item.value" />
          <label :for="`q-${index}`" class="ml-2">{{item.name}}</label>
        </div>
      </div>
      <div class="flex flex-wrap gap-3 ">
      <Button label="Назад" @click="tests[test_id-1].current_question_index -= 1"
              :disabled="tests[test_id-1].current_question_index===0"/>
      <Button label="Далее" @click="tests[test_id-1].current_question_index + 1 ===tests[test_id-1].questions.length
                                    ?
                                    saveData()
                                    :
                                    tests[test_id-1].current_question_index += 1"
              :disabled="tests[test_id-1].questions[tests[test_id-1].current_question_index].selected_answer === null"/>
      </div>
    </div>
    <div v-else class="container">
      <h1 class="text-center text-primary">Результат</h1>
        <p class="text-2xl text-center mb-5">{{result_text}}</p>
      <div class="text-center">
        <Button label="Назад к выбору тестов" @click="$router.push('/tests')"/>
      </div>

    </div>
  </section>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const APIURL = runtimeConfig.public.APIURL
const route = useRoute()
const test_id = route.params.id
const show_result = ref(false)
const result_text = ref('')
const session_id = localStorage.getItem('session_id')
const saveData = async () => {
  let result = 0
  tests.value[test_id-1].questions.forEach((el)=>{
    result += el.selected_answer
  })
  result_text.value = tests.value[test_id-1].results.filter(x=> result <= x.max_val && result >= x.min_val )[0]?.text
  show_result.value = true
  const data = ref({})
  data.value[`test${test_id}`] = result
  console.log(data.value)
  await $fetch( `${APIURL}/api/data/test/${session_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data.value)
  } );
}

const tests = ref([
  {
    current_question_index:0,
    test_name : 'Шкала социальной тревожности Либовица',
    results:[
      {min_val:55,max_val:65,text:'Слабовыраженная социофобия'},
      {min_val:65,max_val:80,text:'Достаточно выраженная социофобия'},
      {min_val:80,max_val:95,text:'Сильная социофобия'},
      {min_val:95,max_val:500,text:'Очень сильная социофобия'},
    ],
    questions : [
        {
          name:'Говорить по телефону в общественных местах. Страх или тревога?',
          selected_answer:null,
          answers:[
            {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
          ]
        },
      {
        name:'Говорить по телефону в общественных местах. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },
      {
        name:'Участвовать в деятельности небольшой группы. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Участвовать в деятельности небольшой группы. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Есть в общественных местах. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Есть в общественных местах. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Есть в общественных местах. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Есть в общественных местах. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Говорить с начальством (вышестоящим лицом). Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Говорить с начальством (вышестоящим лицом). Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Выполнять какие-либо действия или говорить перед аудиторией. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Выполнять какие-либо действия или говорить перед аудиторией. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Участвовать в вечеринке, идти в гости. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Участвовать в вечеринке, идти в гости. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Работать под наблюдением (в присутствии) кого-либо. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Работать под наблюдением (в присутствии) кого-либо. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Писать под наблюдением в присутствии) кого-либо. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Писать под наблюдением в присутствии) кого-либо. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Говорить по телефону с малознакомым человеком. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Говорить по телефону с малознакомым человеком. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Говорить с глазу на глаз с малознакомым человеком. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Говорить с глазу на глаз с малознакомым человеком. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Встречаться с незнакомыми людьми. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Встречаться с незнакомыми людьми. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Мочиться в общественном туалете. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Мочиться в общественном туалете. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Входить в комнату, где уже сидят другие люди. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Входить в комнату, где уже сидят другие люди. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Быть в центре внимания. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Быть в центре внимания. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Выступать на собрании без подготовки. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Выступать на собрании без подготовки. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:' Тестироваться на умения, способности знания. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:' Тестироваться на умения, способности знания. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Выражать неодобрение или несогласие с малознакомым человеком. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Выражать неодобрение или несогласие с малознакомым человеком. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Смотреть прямо в глаза малознакомому человеку. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Смотреть прямо в глаза малознакомому человеку. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Выступать с подготовленной речью перед группой людей . Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Выступать с подготовленной речью перед группой людей . Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Пытаться познакомиться с кем-то с целью сексуальных или романтических отношений.  Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Пытаться познакомиться с кем-то с целью сексуальных или романтических отношений.  Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Возвратить товар в магазин или договориться о выплате компенсации. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Возвратить товар в магазин или договориться о выплате компенсации. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Организовать вечеринку/пригласить гостей. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Организовать вечеринку/пригласить гостей. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },

      {
        name:'Устоять перед настойчивыми предложениями продавца. Страх или тревога?',
        selected_answer:null,
          answers:[
          {name:'Отсутствует', value: 1},{name:'Выражены слабо', value: 2},{name:'Выражены умеренно', value: 3},{name:'Выражены сильно', value: 4},
        ]
      },
      {
        name:'Устоять перед настойчивыми предложениями продавца. Избегание ситуации?',
        selected_answer:null,
          answers:[
          {name:'Никогда', value: 1},{name:'Иногда', value: 2},{name:'Часто', value: 3},{name:'Как правило', value: 4},
        ]
      },
    ]
  },
  {
    current_question_index:0,
    test_name : 'Шкала Страх негативной оценки BFNE S',
    results:[
      {min_val:0,max_val:24,text:'Страх негативной оценки в норме и не выражен ярко'},
      {min_val:24,max_val:500,text:'Страх негативной оценки сильно выражен и мешает спокойному (нормированному социальному взаимодействию)'},
    ],
    questions : [
      {
        name:'Я беспокоюсь о том, что могут подумать обо мне люди, даже если это не имеет никакого значения',
        selected_answer:null,
        answers:[
          {name:'Это не про меня', value: 1},{name:'Это немного про меня', value: 2},{name:'Отчасти это про меня', value: 3},{name:'Это про меня', value: 4},{name:'Это полностью про меня', value: 5},
        ]
      },
      {
        name:'Я часто боюсь, что люди заметят мои недостатки.',
        selected_answer:null,
        answers:[
          {name:'Это не про меня', value: 1},{name:'Это немного про меня', value: 2},{name:'Отчасти это про меня', value: 3},{name:'Это про меня', value: 4},{name:'Это полностью про меня', value: 5},
        ]
      },
      {
        name:'Я боюсь, что другие люди не одобрят меня',
        selected_answer:null,
        answers:[
          {name:'Это не про меня', value: 1},{name:'Это немного про меня', value: 2},{name:'Отчасти это про меня', value: 3},{name:'Это про меня', value: 4},{name:'Это полностью про меня', value: 5},
        ]
      },
      {
        name:'Я боюсь, что другие люди будут придираться ко мне',
        selected_answer:null,
        answers:[
          {name:'Это не про меня', value: 1},{name:'Это немного про меня', value: 2},{name:'Отчасти это про меня', value: 3},{name:'Это про меня', value: 4},{name:'Это полностью про меня', value: 5},
        ]
      },
      {
        name:'Когда я разговариваю с кем-то, я беспокоюсь, что мой собеседник может думать обо мне в этот момент',
        selected_answer:null,
        answers:[
          {name:'Это не про меня', value: 1},{name:'Это немного про меня', value: 2},{name:'Отчасти это про меня', value: 3},{name:'Это про меня', value: 4},{name:'Это полностью про меня', value: 5},
        ]
      },
      {
        name:'Обычно я беспокоюсь о том, какое впечатление я произвожу',
        selected_answer:null,
        answers:[
          {name:'Это не про меня', value: 1},{name:'Это немного про меня', value: 2},{name:'Отчасти это про меня', value: 3},{name:'Это про меня', value: 4},{name:'Это полностью про меня', value: 5},
        ]
      },
      {
        name:'Иногда я думаю, что я чересчур озадачиваюсь тем, что подумают обо мне другие.',
        selected_answer:null,
        answers:[
          {name:'Это не про меня', value: 1},{name:'Это немного про меня', value: 2},{name:'Отчасти это про меня', value: 3},{name:'Это про меня', value: 4},{name:'Это полностью про меня', value: 5},
        ]
      },
      {
        name:'Я часто беспокоюсь, что я скажу или сделаю что-нибудь неправильное',
        selected_answer:null,
        answers:[
          {name:'Это не про меня', value: 1},{name:'Это немного про меня', value: 2},{name:'Отчасти это про меня', value: 3},{name:'Это про меня', value: 4},{name:'Это полностью про меня', value: 5},
        ]
      },
    ]
  },
  {
    current_question_index:0,
    test_name : 'Тест на уровень социальной тревожности Степанько А.Н.',
    results:[
      {min_val:0,max_val:3,text:'Уровень социальной тревожности низкий. Студент скорее всего уверен в себе и комфортно чувствует себя в обществе.'},
      {min_val:4,max_val:7,text:'Уровень социальной тревожности умеренный. Студент может испытывать легкую нерешительность в общении с людьми, но это не мешает ему учиться и общаться.'},
      {min_val:8,max_val:11,text:'Уровень социальной тревожности высокий. Студент может страдать от социальной неуверенности, избегать общения с новыми людьми и испытывать трудности в общении.'},
      {min_val:12,max_val:15,text:'Уровень социальной тревожности очень высокий. Студент, вероятно, испытывает значительные трудности в общении, переживает из-за оценки окружающих и избегает общественных мероприятий.'},
    ],
    questions : [
      {
        name:'Часто ли вы беспокоитесь о том, что другие люди могут оценить вас негативно?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Считаете ли вы, что люди обращают на вас слишком много внимания?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Бывает ли у вас трудно поддерживать разговоры с новыми людьми?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Боитесь ли вы высказывать свое мнение из-за возможных негативных реакций окружающих?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Страшно ли вам выступать перед аудиторией или говорить на публике?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Страдаете ли вы от чувства неудобства в общении с людьми из-за нерешительности?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Часто ли вы переживаете из-за своей внешности или поведения в обществе?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Бывает ли у вас трудно установить контакт с новыми людьми?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Боитесь ли вы быть в центре внимания на вечеринке или в другом общественном месте?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Избегаете ли вы общения с людьми, которые вам не нравятся?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Страшно ли вам представиться на работу или на собеседование?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Избегаете ли вы конфликтов с окружающими?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Часто ли вы переживаете из-за своих поступков и слов в обществе?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Часто ли вы сомневаетесь в своих возможностях в общении с людьми?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
      {
        name:'Страдаете ли вы от социальной неуверенности и чувства неполноценности?',
        selected_answer:null,
        answers:[
          {name:'Да', value: 1},{name:'Нет', value: 0},
        ]
      },
    ]
  }
])


</script>