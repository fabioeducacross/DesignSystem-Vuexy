<template>
  <div class="certificate print-component" :data-fileName="data.studentName">
    <div class="content-container">
      <p>É com grande satisfação que parabenizamos:</p>

      <h3 class="font-medium student-name mb-1">{{ data.studentName }}</h3>

      <div class="aggrement">
        <p class="mb-0">
          da turma <span>{{ data.className }}</span
          >, do(a) <span>{{ data.institutionName }}</span
          >, pela participação
          <br />
          no Evento <span>"{{ data.eventActiveName }}"</span>.
        </p>
        <p>Você realizou diversas jogadas e desenvolveu várias habilidades!</p>
      </div>
      <p>{{ name }}, Brasil, {{ currentDateString }}.</p>
    </div>
    <div class="logo-container">
      <div class="logo">
        <b-img :src="logo" />
      </div>
      <div v-if="schoolLogo" class="divisor"></div>
      <div v-if="schoolLogo" class="logo">
        <b-img :src="schoolLogo" />
      </div>
    </div>
    <div class="footer-container">
      <span>@{{ instagram }}</span>
      <span>{{ url }}</span>
    </div>
  </div>
</template>

<script setup>
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { monthName } from '@/utils/utils'

// Props
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  schoolLogo: {
    type: [String, null],
    default: null,
  },
})

// Main brand logo and metadata
const logo = getWhitelabelConfig('MainLogo')
const instagram = getWhitelabelConfig('InstagramUsername')
const url = getWhitelabelConfig('BeautifulUrl')
const name = getWhitelabelConfig('Name')

// Current date string
const dateNow = new Date()
const month = dateNow.getMonth()
const year = dateNow.getFullYear()
const currentDateString = `${monthName(month + 1)} de ${year}`.toLowerCase()

// Helper (not used in template but migrated for completeness)
const eventPeriodString = (start, end) => {
  const startDate = new Date(start)
  const endDate = new Date(end)

  const startDay = startDate.getDate()
  const endDay = endDate.getDate()

  const startMonth = startDate.getMonth() + 1
  const endMonth = endDate.getMonth() + 1

  if (startMonth !== endMonth)
    return `${startDay} de ${monthName(startMonth)} a ${endDay} de ${monthName(
      endMonth,
    )}`.toLowerCase()

  return `${startDay} a ${endDay} de ${monthName(endMonth)}`.toLowerCase()
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables/_variables.scss';

.certificate {
  position: relative;

  width: 1008px;
  height: 712px;

  background-image: url(@/assets/images/pdf/event-certificate/background.svg);
  background-size: cover;
  background-repeat: no-repeat;

  margin-left: auto;
  margin-right: auto;

  color: #000;

  -webkit-print-color-adjust: exact;

  border: 1px solid transparent;

  @media print {
    page-break-after: auto;
    page-break-inside: avoid;
    margin-left: 0;
    margin-right: 0;
  }
}

.content-container {
  position: absolute;
  top: 283.68px;
  left: 87.9px;

  width: 832px;

  text-align: center;

  p {
    font-size: 15.5px;
  }
}

.student-name {
  color: $brand-color-primary-medium;
  font-size: 27.577px;
}

.aggrement span {
  font-weight: 700;
}

.logo-container {
  position: absolute;
  top: 523px;

  width: 100%;
  height: 72px;

  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    height: 72px;
    width: 190px;

    display: flex;
    align-items: center;

    &:nth-of-type(1) {
      justify-content: end;
    }

    &:nth-of-type(2) {
      justify-content: start;
    }

    & > img {
      max-height: 100%;
      max-width: 100%;
    }
  }

  .divisor {
    height: 100%;
    width: 1px;

    border-right: 1px solid #000;
    margin: 0 25px;
  }
}

.footer-container {
  position: absolute;
  top: 653.4px;
  left: 87px;

  width: 832px;

  display: flex;
  justify-content: space-between;

  color: $brand-color-primary-medium;
  font-weight: 600;
}
</style>