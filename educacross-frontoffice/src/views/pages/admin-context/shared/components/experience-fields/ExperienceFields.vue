<template>
  <div class="experience-fields-container d-flex justify-content-around">
    <div
      v-if="type === 'Portugues'"
      class="d-flex justify-content-around align-items-start experience-fields-container"
    >
      <div class="experience-field">
        <all-fields-img :activate="handleGeFirstAxis() ? true : false" class="" />
        <p>Todos os campos de atuação</p>
        <span>
          {{
            handleGeFirstAxis() ? handleGeFirstAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
      <div class="experience-field">
        <life-field-img :activate="handleGeSecondAxis() ? true : false" class="" />
        <p>Campo da Vida Cotidiana</p>
        <span>
          {{
            handleGeSecondAxis() ? handleGeSecondAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
      <div class="experience-field">
        <public-field-img :activate="handleGeThridAxis() ? true : false" class="" />
        <p>Campo da Vida Pública</p>
        <span>
          {{
            handleGeThridAxis() ? handleGeThridAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
      <div class="experience-field">
        <study-field-img :activate="handleGeFourthAxis() ? true : false" class="" />
        <p>Campo das Práticas de Estudo e Pesquisa</p>
        <span>
          {{
            handleGeFourthAxis() ? handleGeFourthAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
      <div class="experience-field">
        <artistic-field-img :activate="handleGeFifthAxis() ? true : false" class="" />
        <p>Campo Artístico-Literário</p>
        <span>
          {{
            handleGeFifthAxis() ? handleGeFifthAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
    </div>
    <div
      v-else-if="type === 'Matematica'"
      class="d-flex justify-content-around align-items-start experience-fields-container"
    >
      <div class="experience-field">
        <algebra-img :activate="handleGeFirstAxis() ? true : false" class="" />
        <p>Álgebra</p>
        <span>
          {{
            handleGeFirstAxis() ? handleGeFirstAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
      <div class="experience-field">
        <geometry-field-img :activate="handleGeSecondAxis() ? true : false" class="" />
        <p>Geometria</p>
        <span>
          {{
            handleGeSecondAxis() ? handleGeSecondAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
      <div class="experience-field">
        <measure-field-img :activate="handleGeThridAxis() ? true : false" class="" />
        <p>Grandezas e Medidas</p>
        <span>
          {{
            handleGeThridAxis() ? handleGeThridAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
      <div class="experience-field">
        <study-field-img-math :activate="handleGeFourthAxis() ? true : false" class="" />
        <p>Números</p>
        <span>
          {{
            handleGeFourthAxis() ? handleGeFourthAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
      <div class="experience-field">
        <statistic-field-img :activate="handleGeFifthAxis() ? true : false" class="" />
        <p>Probabilidade e Estatística</p>
        <span>
          {{
            handleGeFifthAxis() ? handleGeFifthAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
    </div>
    <div
      v-else-if="type === 'LigaDasCorujinhas'"
      class="d-flex justify-content-around align-items-start experience-fields-container"
    >
      <div class="experience-field">
        <us-field-img :activate="handleGeFirstAxis() ? true : false" class="" />
        <p>Eu, o Outro e Nós</p>
        <span>
          {{
            handleGeFirstAxis() ? handleGeFirstAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
      <div class="experience-field">
        <body-field-img :activate="handleGeSecondAxis() ? true : false" class="" />
        <p>Corpo, Gestos e Movimentos</p>
        <span>
          {{
            handleGeSecondAxis() ? handleGeSecondAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
      <div class="experience-field">
        <shape-field-img :activate="handleGeThridAxis() ? true : false" class="" />
        <p>Traços, Sons, Cores e Formas</p>
        <span>
          {{
            handleGeThridAxis() ? handleGeThridAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
      <div class="experience-field">
        <imagination-field-img :activate="handleGeFourthAxis() ? true : false" class="" />
        <p>Escuta, Fala, Pensamento e Imaginação</p>
        <span>
          {{
            handleGeFourthAxis() ? handleGeFourthAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
      <div class="experience-field">
        <relation-field-img :activate="handleGeFifthAxis() ? true : false" class="" />
        <p>Espaço, Tempo, Quantidades, Relações e Transformações</p>
        <span>
          {{
            handleGeFifthAxis() ? handleGeFifthAxis().activities + ' jogos' : '0 jogos'
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import AlgebraImg from '@/assets/images/missions/matematica/AlgebraImg.vue'
import GeometryFieldImg from '@/assets/images/missions/matematica/GeometryFieldImg.vue'
import MeasureFieldImg from '@/assets/images/missions/matematica/MeasureFieldImg.vue'
import StatisticFieldImg from '@/assets/images/missions/matematica/StatisticFieldImg.vue'
import StudyFieldImgMath from '@/assets/images/missions/matematica/StudyFieldImgMath.vue'
import BodyFieldImg from '@/assets/images/missions/multiletramento/BodyFieldImg.vue'
import ImaginationFieldImg from '@/assets/images/missions/multiletramento/ImaginationFieldImg.vue'
import RelationFieldImg from '@/assets/images/missions/multiletramento/RelationFieldImg.vue'
import ShapeFieldImg from '@/assets/images/missions/multiletramento/ShapeFieldImg.vue'
import UsFieldImg from '@/assets/images/missions/multiletramento/UsFieldImg.vue'
import AllFieldsImg from '@/assets/images/missions/portugues/AllFieldsImg.vue'
import ArtisticFieldImg from '@/assets/images/missions/portugues/ArtisticFieldImg.vue'
import LifeFieldImg from '@/assets/images/missions/portugues/LifeFieldImg.vue'
import PublicFieldImg from '@/assets/images/missions/portugues/PublicFieldImg.vue'
import StudyFieldImg from '@/assets/images/missions/portugues/StudyFieldImg.vue'
import BNCC_AXIS_NAME from '@/consts/admin-context/BNCCAxisName'

// Props
const props = defineProps({
  type: { type: String, required: true },
  data: { type: Array, required: false, default: () => [] },
})

// Axis handlers
const handleGeFirstAxis = () => {
  return props.data.find(
    data => data.knowledgeAxisName === BNCC_AXIS_NAME(props.type).firstAxis,
  )
}
const handleGeSecondAxis = () => {
  return props.data.find(
    data => data.knowledgeAxisName === BNCC_AXIS_NAME(props.type).secondAxis,
  )
}
const handleGeThridAxis = () => {
  return props.data.find(
    data => data.knowledgeAxisName === BNCC_AXIS_NAME(props.type).thirdAxis,
  )
}
const handleGeFourthAxis = () => {
  return props.data.find(
    data => data.knowledgeAxisName === BNCC_AXIS_NAME(props.type).fourthAxis,
  )
}
const handleGeFifthAxis = () => {
  return props.data.find(
    data => data.knowledgeAxisName === BNCC_AXIS_NAME(props.type).fifthAxis,
  )
}
</script>

<style lang="scss" scoped>
  .experience-field {
    width: 25%;
    margin: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      text-align: center;

      margin: 16px 0 8px 0;
      font-weight: 600;
      font-size: 15px;
      line-height: 14px;

      color: #6e6b7b;
    }

    span {
      margin: 0;
      font-weight: 500;
      font-size: 14px;
      line-height: 23px;

      color: #6e6b7b;
    }

    img {
      width: 92px;
      height: 92px;
    }
  }

  @media (max-width: 900px) {
    .experience-fields-container {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>