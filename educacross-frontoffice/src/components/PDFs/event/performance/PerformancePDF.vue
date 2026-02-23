<template>
  <div class="performance-report print-component" :data-fileName="student.studentName">
    <div class="title-container">
      <h4 class="mb-0 font-medium">{{ student.eventActiveName }}</h4>
      <span class="font-10">
        {{ formatDate(student.startDate) }} a {{ formatDate(student.endDate) }}
      </span>
    </div>
    <div class="student-info-container">
      <h3 class="mb-0 font-medium">{{ student.studentName }}</h3>
      <span class="font-10">{{ student.className }} • {{ student.institutionName }}</span>
    </div>
    <h6 class="awards">
      {{ formatNumber(student.gold) }}
    </h6>
    <h6 class="awards">
      {{ formatNumber(student.silver) }}
    </h6>
    <h6 class="awards">
      {{ formatNumber(student.bronze) }}
    </h6>
    <h6 class="awards">
      {{ formatNumber(eventData.gold) }}
    </h6>
    <h6 class="awards">
      {{ formatNumber(eventData.silver) }}
    </h6>
    <h6 class="awards">
      {{ formatNumber(eventData.bronze) }}
    </h6>
    <div class="points-container">
      <h6>{{ formatNumber(student.points) }}</h6>
      <h6>{{ formatNumber(eventData.points) }}</h6>
    </div>
    <div class="themes-performance-container">
      <div
        v-for="(knowledge, index) in student.knowledgeAxes"
        :key="`knowledge-${index}`"
        class="theme font-10"
      >
        <div class="theme-performance">
          <div
            v-for="(percent, percentIndex) in dividePercent(knowledge.performance)"
            :key="`percent-${percentIndex}`"
            class="theme-performance-point"
            :class="`bg-${getPerformancPDFEnum(knowledge.performance).variant}`"
          ></div>
        </div>
        <span class="text-black">{{ knowledge.name }}</span>
      </div>
    </div>
    <!-- <div class="legend-container">
      <LegendEnumPDF :legends="[performancePDFLegend]" class="shadow-none" />
    </div> -->
    <div class="footer-container">
      <span class="font-12 font-semibold">@{{ name }}</span>
      <span class="font-12 font-semibold">{{ url }}</span>
    </div>
    <div class="logo-container">
      <b-img :src="logo">logo</b-img>
    </div>
  </div>
</template>

<script setup>
import LegendEnumPDF from '@/components/legends/LegendEnumPDF.vue'
import { performancePDFLegend, getPerformancPDFEnum } from '@/consts/performancePdfEnum.js'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { formatNumber } from '@/filters/filters'
import formatDate from '@/utils/date'

const props = defineProps({
  eventData: {
    type: Object,
    required: true,
  },
  student: {
    type: Object,
    required: true,
  },
})

const logo = getWhitelabelConfig('MainLogo')
const name = getWhitelabelConfig('InstagramUsername')
const url = getWhitelabelConfig('BeautifulUrl')

const dividePercent = percent => {
  if (percent < 25) return 1
  return Math.round(percent / 25)
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables/_variables.scss';

.performance-report {
  position: relative;
  box-sizing: border-box;
  width: 713px !important;
  height: 1008px !important;
  background-image: url(@/assets/images/pdf/performance-record/background.svg);
  background-size: cover;
  background-repeat: no-repeat;
  color: #000;

  border: none;
  margin-left: auto;
  margin-right: auto;

  text-align: center;

  -webkit-print-color-adjust: exact;

  page-break-after: auto;
  page-break-inside: avoid;

  /* Print-specific styles */
  @media print {
    margin-left: 0;
    margin-right: 0;
  }
}

.title-container {
  position: absolute;
  top: 124px;
  width: 100%;

  display: flex;
  justify-content: center;
  flex-direction: column;

  h4 {
    color: $brand-color-primary-medium;
  }
}

.student-info-container {
  position: absolute;
  top: 179px;
  left: 93px;

  width: 527px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h3 {
    color: $brand-color-primary-medium;
  }
}

.awards-container {
  position: absolute;

  width: 445px;

  display: flex;
  justify-content: space-between;

  top: 368px;
  left: 135px;
}

.awards {
  position: absolute;
  top: 368px;
  width: 35.2px;
  height: fit-content;
  margin-bottom: 0;

  text-align: center;
  line-height: normal;
  color: white;
  font-weight: 700;

  // left items
  &:nth-of-type(1) {
    left: 143.87px;
  }

  &:nth-of-type(2) {
    left: 200.45px;
  }

  &:nth-of-type(3) {
    left: 255.62px;
  }

  //rigth items
  &:nth-of-type(4) {
    right: 252.52px;
  }

  &:nth-of-type(5) {
    right: 195.94px;
  }

  &:nth-of-type(6) {
    right: 140.77px;
  }
}

.points-container {
  position: absolute;

  top: 508px;
  left: 180px;
  width: 370px;

  display: grid;
  grid-template-columns: 89px 89px;
  justify-content: space-between;

  h6 {
    color: white;
    font-weight: 700;
  }
}

.themes-performance-container {
  position: absolute;
  top: 613px;
  left: 107.7px;

  width: 500px;
  height: 64px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;

  margin-top: 10px;
}

.theme {
  width: 91.5px;

  text-align: center;
}

.theme-performance {
  background-color: #efefef;
  border-radius: 6px;

  width: 100%;
  height: 25px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.theme-performance-point {
  width: 100%;
  height: 100%;

  border-radius: 6px;
}

.legend-container {
  position: absolute;
  top: 687px;
  left: 199px;
}

.footer-container {
  position: absolute;
  top: 903px;
  left: 77px;

  display: flex;
  justify-content: space-between;
  width: 560px;

  color: $brand-color-primary-medium;
}

.logo-container {
  position: absolute;
  top: 945px;

  width: 100%;

  display: flex;
  justify-content: center;

  img {
    max-width: 155px;
  }
}

.HTMLtoPdf {
  .performance-report {
    margin: 0;
  }

  .title-container {
    top: 115px;
  }

  .student-info-container {
    top: 170px;
  }

  .awards {
    top: 362px;
  }

  .points-container {
    top: 502px;
  }

  .themes-performance-container {
    top: 606px;
  }

  .legend-container {
    top: 678px;
  }

  .footer-container {
    top: 896px;
  }

  .footer-container {
    top: 894px;
  }
}
</style>

<style>
@media print {
  body {
    min-width: 0 !important;
  }
}
</style>