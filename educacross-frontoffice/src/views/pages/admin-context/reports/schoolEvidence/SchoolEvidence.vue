<template>
  <SimpleTab>
    <b-card>
      <b-row>
        <b-col v-if="isNetworkManager">
          <b-form-group id="escola" label="Escola" label-for="instituition">
            <ESelect
              id="institution-select"
              label="name"
              :value="institutionObject"
              :options="institutionList"
              :clearable="false"
              :loading="institutionListLoading"
              placeholder="Selecione uma instituição"
              @input="changeInstitution"
            >
              <template #no-options> Nenhuma Escola encontrada </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="auto">
          <SelectSubject :fetch-on-mounted="!isNetworkManager" />
        </b-col>
        <b-col>
          <b-form-group
            v-if="filters.ReportPeriod.id === 2"
            id="year"
            class="filters-form-items"
            label="Ano Letivo"
            label-for="year"
          >
            <ESelect
              id="year-select"
              v-model="selectedYear"
              label="name"
              :options="yearListFormatted"
              :clearable="false"
              placeholder="Selecione um ano"
              @input="handleYearChange"
            >
              <template #no-options> Nenhum ano letivo encontrado </template>
            </ESelect>
          </b-form-group>
          <b-form-group
            v-if="filters.ReportPeriod.id === 0"
            id="month"
            class="filters-form-items"
            label="Mês"
            label-for="month"
          >
            <ESelect
              id="month-select"
              v-model="selectedMonth"
              label="name"
              :options="monthList"
              :clearable="false"
              placeholder="Selecione um mês"
              @input="handleMonthChange"
            >
              <template #no-options> Nenhum mês encontrado </template>
            </ESelect>
          </b-form-group>
          <b-form-group
            v-if="filters.ReportPeriod.id === 1"
            id="semestre"
            class="filters-form-items"
            label="Semestre"
            label-for="semester"
          >
            <ESelect
              id="semester-select"
              v-model="selectedSemester"
              label="name"
              :options="semesterList"
              :clearable="false"
              placeholder="Selecione um semestre"
              @input="handleSemesterChange"
            >
              <template #no-options> Nenhum semestre encontrado </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="auto">
          <b-form-group label-for="button">
            <template v-slot:label>
              <span class="d-none d-md-inline-block"> &nbsp;</span>
            </template>
            <b-button
              variant="outline-primary"
              class="d-block d-md-inline-block w-full w-md-auto"
              :disabled="loadingReportExcel"
              @click="exportToExcel"
            >
              <b-spinner v-if="loadingReportExcel" variant="light" small />
              Exportar em Excel
            </b-button>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
    <b-card body-class="">
      <div class="button-content">
        <b-button type="button" variant="primary" :disabled="loadingReport" @click="reportToPdf">
          <b-spinner v-if="loadingReport" variant="light" small />
          Visualizar PDF
        </b-button>
      </div>
      <div class="overflow-x-auto pb-1">
        <div class="card-body-school">
          <div class="carousel-width">
            <b-carousel controls indicators :interval="99999">
              <!-- Slide 1 -->
              <b-carousel-slide>
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide1.png')"
                    alt=""
                  />
                  <div class="slide-title">
                    <span>Relatório de Evidências</span>
                  </div>
                  <div class="carousel-caption">
                    <p class="institution-name">
                      {{ reportData.institutionName }}
                    </p>
                    <span class="period-chosen-green">{{ reportData.periodChosen }}</span>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 2 -->
              <b-carousel-slide class="position-relative">
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide3.png')"
                    alt=""
                  />
                  <div class="engagement">
                    <div style="color: #225054; font-size: 5rem; font-family: dimbo">
                      Evidências na Escola
                    </div>
                  </div>
                  <div
                    style="
                      color: #225054;
                      padding-left: 9rem;
                      position: absolute;
                      width: 100%;
                      text-align: center;
                      top: 29%;
                      font-size: 2.5rem;
                      font-family: dimbo;
                    "
                  >
                    Horas de Aprendizagem
                    <div style="color: #784421; font-size: 2.5rem; font-family: dimbo">
                      {{ convertSeconds(reportData.totalTime) }}
                    </div>
                  </div>
                  <div class="missionsAndStudents">
                    <div style="width: 100%; display: flex; flex-wrap: wrap; font-family: dimbo">
                      <span
                        style="width: 100%; color: #225054; text-align: center; font-family: dimbo"
                        >Finalização de jogos dos alunos</span
                      >
                      <span
                        style="
                          width: 100%;
                          color: #784421;
                          text-align: center;
                          font-size: 2.5rem;
                          font-family: dimbo;
                        "
                        >{{ formatNumber(reportData.engagementInstitution) }}%</span
                      >
                    </div>
                    <div style="width: 100%; display: flex; flex-wrap: wrap; font-family: dimbo">
                      <span
                        style="width: 100%; color: #225054; text-align: center; font-family: dimbo"
                        >Total de Alunos que Jogaram</span
                      >
                      <span
                        style="
                          width: 100%;
                          color: #784421;
                          text-align: center;
                          font-size: 2.5rem;
                          font-family: dimbo;
                        "
                        >{{ formatNumber(reportData.amountStudentsPlayed) }} /
                        {{ formatNumber(reportData.amountStudents) }}</span
                      >
                    </div>
                  </div>
                  <div class="carousel-caption">
                    <span class="period-chosen-green">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-100 px-3"
                    style="position: absolute; left: 0; bottom: 2.5rem"
                  >
                    <div>
                      <h4
                        class="institution-name mb-0"
                        style="color: #225054; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="institution-name mb-0"
                        style="color: #225054; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 3 -->
              <b-carousel-slide class="position-relative">
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide4.png')"
                    alt=""
                  />
                  <div class="gameplayTime">
                    <div style="color: #225054; text-align: center; font-family: dimbo">
                      Jogos Acessados
                    </div>
                    <div style="color: #784421; text-align: center; font-family: dimbo">
                      {{ formatNumber(reportData.activitiesPlayed) }}
                    </div>
                  </div>

                  <div class="gamesAccessed">
                    <div style="color: #225054; font-family: dimbo">
                      Missões enviadas / habilitadas pelos professores
                    </div>
                    <div style="color: #784421; font-family: dimbo">
                      {{ reportData.teacherSendMissions | formatNumber }}
                    </div>
                  </div>

                  <div class="activities">
                    <div style="color: #225054; font-family: dimbo">Desafios Cumpridos</div>
                    <div style="color: #784421; font-family: dimbo">
                      {{ reportData.amountMissions | formatNumber }}
                    </div>
                  </div>

                  <div class="carousel-caption">
                    <span class="period-chosen-green">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-100 px-3"
                    style="position: absolute; left: 0; bottom: 2.5rem"
                  >
                    <div>
                      <h4
                        class="institution-name mb-0"
                        style="color: #225054; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="institution-name mb-0"
                        style="color: #225054; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 4 -->
              <b-carousel-slide class="position-relative">
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide7.png')"
                    alt=""
                  />
                  <div class="engagement-missions-general">Alunos que finalizaram jogos</div>
                  <div class="graphs-content">
                    <engagement-general-graph
                      :engagement="
                        reportData.generalEngagement
                          ? reportData.generalEngagement.map(engagement => engagement.engagement)
                          : []
                      "
                      :period="
                        reportData.generalEngagement
                          ? reportData.generalEngagement.map(period => period.period)
                          : []
                      "
                    />
                  </div>
                  <div class="carousel-caption">
                    <span class="period-chosen-white">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-75"
                    style="position: absolute; left: 100px; bottom: 2.5rem"
                  >
                    <div>
                      <h4 class="mb-0" style="color: #fff; font-size: 1.2rem; font-family: dimbo">
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="mb-0 ml-2"
                        style="color: #fff; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 5 -->
              <b-carousel-slide class="position-relative">
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide7.png')"
                    alt=""
                  />
                  <div v-if="subject.id !== 0" class="engagement-missions-general">
                    Turmas com mais jogos finalizados
                  </div>
                  <div v-if="subject.id === 0" class="engagement-missions-general">
                    Escolas com mais jogos finalizados
                  </div>
                  <div class="topClasses">
                    <div
                      v-if="
                        reportData.classesBetterEngagement
                          ? reportData.classesBetterEngagement.length < 1 && subject.id !== 0
                          : subject.id !== 0
                      "
                      style="font-size: 2.5rem; font-family: dimbo"
                    >
                      Nenhuma turma
                    </div>
                    <div
                      v-if="
                        reportData.classesBetterEngagement
                          ? reportData.classesBetterEngagement.length < 1 && subject.id === 0
                          : subject.id === 0
                      "
                      style="font-size: 2.5rem; font-family: dimbo"
                    >
                      Nenhuma Escola
                    </div>
                    <div
                      v-for="(knowledgeClasses, indexClass) in reportData.classesBetterEngagement"
                      :key="'A' + indexClass"
                      style="font-size: 2.5rem; font-family: dimbo"
                    >
                      {{ knowledgeClasses.className }} -
                      {{ formatNumber(knowledgeClasses.finishedActivities) }}%
                    </div>
                  </div>
                  <div class="carousel-caption">
                    <span class="period-chosen-white">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-75"
                    style="position: absolute; left: 100px; bottom: 2.5rem"
                  >
                    <div>
                      <h4 class="mb-0" style="color: #fff; font-size: 1.2rem; font-family: dimbo">
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="mb-0 ml-2"
                        style="color: #fff; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 6 -->
              <b-carousel-slide
                v-for="(
                  knowledgeClassesEngagement, indexClassesEngagement
                ) in reportData.classesEngagement"
                :key="'B' + indexClassesEngagement"
                class="position-relative"
              >
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide7.png')"
                    alt=""
                  />
                  <div v-if="subject.id !== 0" class="engagement-missions-general">
                    Jogos finalizados por turma
                  </div>
                  <div v-if="subject.id === 0" class="engagement-missions-general">
                    Jogos finalizados por Escola
                  </div>
                  <div class="graphs-content">
                    <engagement-by-class-graph
                      :reports="reportData.classesEngagement[indexClassesEngagement]"
                    />
                  </div>
                  <div class="carousel-caption">
                    <span class="period-chosen-white">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-75"
                    style="position: absolute; left: 100px; bottom: 2.5rem"
                  >
                    <div>
                      <h4 class="mb-0" style="color: #fff; font-size: 1.2rem; font-family: dimbo">
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="mb-0 ml-2"
                        style="color: #fff; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 7 -->
              <b-carousel-slide
                v-for="(
                  knowledgeTotalTimeIsland, indexTotalTimeIsland
                ) in reportData.totalTimeIsland"
                :key="'C' + indexTotalTimeIsland"
                class="position-relative"
              >
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide7.png')"
                    alt=""
                  />
                  <div class="engagement-missions-general">Tempo de estudo Autônomo nas Ilhas</div>
                  <div class="graphs-content">
                    <time-in-island-graph
                      :reports="reportData.totalTimeIsland[indexTotalTimeIsland]"
                    />
                  </div>
                  <div
                    style="
                      position: absolute;
                      width: 100%;
                      top: 85%;
                      font-size: 2rem;
                      color: white;
                      text-align: center;
                      font-family: dimbo;
                    "
                  >
                    Total: {{ convertSeconds(totalTimeIslandSum) }}
                  </div>
                  <div class="carousel-caption">
                    <span class="period-chosen-white">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-75"
                    style="position: absolute; left: 100px; bottom: 2.5rem"
                  >
                    <div>
                      <h4 class="mb-0" style="color: #fff; font-size: 1.2rem; font-family: dimbo">
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="mb-0 ml-2"
                        style="color: #fff; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 8 -->
              <b-carousel-slide
                v-for="(knowledgeTotalTimeGuide, indexTotalTimeGuide) in reportData.totalTimeGuide"
                :key="'D' + indexTotalTimeGuide"
                class="position-relative"
              >
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide7.png')"
                    alt=""
                  />
                  <div class="engagement-missions-general" style="padding-right: 3rem">
                    Tempo de Estudo em missões enviadas/habilitadas
                  </div>
                  <div class="graphs-content">
                    <time-in-guide-graph
                      :reports="reportData.totalTimeGuide[indexTotalTimeGuide]"
                    />
                  </div>
                  <div
                    style="
                      position: absolute;
                      width: 100%;
                      top: 85%;
                      font-size: 2rem;
                      color: white;
                      text-align: center;
                      font-family: dimbo;
                    "
                  >
                    Total: {{ convertSeconds(totalTimeGuideSum) }}
                  </div>
                  <div class="carousel-caption">
                    <span class="period-chosen-white">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-75"
                    style="position: absolute; left: 100px; bottom: 2.5rem"
                  >
                    <div>
                      <h4 class="mb-0" style="color: #fff; font-size: 1.2rem; font-family: dimbo">
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="mb-0 ml-2"
                        style="color: #fff; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 9 -->
              <b-carousel-slide class="position-relative">
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide7.png')"
                    alt=""
                  />
                  <div class="engagement-missions-general">
                    Total de missões habilitadas/enviadas <br /><span style="font-family: dimbo"
                      >(Por semana)</span
                    >
                  </div>

                  <div class="graphs-content">
                    <guides-created-by-teacher-graph
                      :reports="
                        reportData.createdGuides
                          ? reportData.createdGuides.map(reports => reports)
                          : []
                      "
                    />
                  </div>
                  <div class="carousel-caption">
                    <span class="period-chosen-white">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-75"
                    style="position: absolute; left: 100px; bottom: 2.5rem"
                  >
                    <div>
                      <h4 class="mb-0" style="color: #fff; font-size: 1.2rem; font-family: dimbo">
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="mb-0 ml-2"
                        style="color: #fff; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 10 -->
              <b-carousel-slide
                v-for="(knowledgeClassGuides, indexClassGuides) in reportData.classGuides"
                :key="'E' + indexClassGuides"
                class="position-relative"
              >
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide7.png')"
                    alt=""
                  />
                  <div class="engagement-missions-general">
                    Total de missões habilitadas/enviadas <br /><span style="font-family: dimbo"
                      >(Por semana)</span
                    >
                  </div>

                  <div class="graphs-content">
                    <guides-by-class-graph :reports="knowledgeClassGuides" />
                  </div>
                  <div class="carousel-caption">
                    <span class="period-chosen-white">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-75"
                    style="position: absolute; left: 100px; bottom: 2.5rem"
                  >
                    <div>
                      <h4 class="mb-0" style="color: #fff; font-size: 1.2rem; font-family: dimbo">
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="mb-0 ml-2"
                        style="color: #fff; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 11 -->
              <b-carousel-slide class="position-relative">
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide7.png')"
                    alt=""
                  />
                  <div class="engagement-missions-general">Desempenho Geral da Escola</div>
                  <div class="graphs-content">
                    <institution-performance-graph :reports="reportData.institutionPerformance" />
                  </div>
                  <div class="carousel-caption">
                    <span class="period-chosen-white">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-75"
                    style="position: absolute; left: 100px; bottom: 2.5rem"
                  >
                    <div>
                      <h4 class="mb-0" style="color: #fff; font-size: 1.2rem; font-family: dimbo">
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="mb-0 ml-2"
                        style="color: #fff; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 12 -->
              <b-carousel-slide class="position-relative">
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide7.png')"
                    alt=""
                  />
                  <div class="engagement-missions-general">Acessos por Dispositivo</div>
                  <div class="graphs-content">
                    <access-by-device-graph :reports="reportData.accessDevice" />
                  </div>
                  <div class="carousel-caption">
                    <span class="period-chosen-white">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-75"
                    style="position: absolute; left: 100px; bottom: 2.5rem"
                  >
                    <div>
                      <h4 class="mb-0" style="color: #fff; font-size: 1.2rem; font-family: dimbo">
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="mb-0 ml-2"
                        style="color: #fff; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 13 -->
              <b-carousel-slide class="position-relative">
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide7.png')"
                    alt=""
                  />
                  <div class="engagement-missions-general">Distribuição de Acessos</div>
                  <div class="graphs-content">
                    <access-distribution-print-graph :reports="reportData.accessDistribution" />
                  </div>
                  <div class="carousel-caption">
                    <span class="period-chosen-white">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-75"
                    style="position: absolute; left: 100px; bottom: 2.5rem"
                  >
                    <div>
                      <h4 class="mb-0" style="color: #fff; font-size: 1.2rem; font-family: dimbo">
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="mb-0 ml-2"
                        style="color: #fff; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 14 -->
              <b-carousel-slide class="position-relative">
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/slide19.png')"
                    alt=""
                  />
                  <div class="institutionEngagement">
                    <div style="color: #ffc000; font-family: dimbo">
                      {{ convertSeconds(reportData.averageTimeByStudent) }}
                    </div>
                    <div style="color: white; font-family: dimbo">
                      Média de Tempo Jogado por Aluno
                    </div>
                  </div>

                  <div class="averageGuidesClass">
                    <div style="color: #ffc000; font-family: dimbo">
                      {{
                        reportData.averageGuidesByClass != 0
                          ? formatNumber(reportData.averageGuidesByClass)
                          : 0
                      }}
                    </div>
                    <div style="color: white; font-family: dimbo">Média de Missões por Turma</div>
                  </div>
                  <div class="carousel-caption">
                    <span class="period-chosen-white">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-100 px-3"
                    style="position: absolute; left: 0; bottom: 2.5rem"
                  >
                    <div>
                      <h4 class="mb-0" style="color: #fff; font-size: 1.2rem; font-family: dimbo">
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="mb-0 ml-2"
                        style="color: #fff; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
              <!-- Slide 15 -->
              <b-carousel-slide class="position-relative">
                <template v-slot:img>
                  <img
                    class="w-100"
                    width="836"
                    height="590"
                    :src="require('@/assets/images/relatorioEvidencias/relatorioFim.png')"
                    alt=""
                  />
                  <div class="carousel-caption">
                    <span class="period-chosen-green">{{ reportData.periodChosen }}</span>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between w-100 px-3"
                    style="position: absolute; left: 0; bottom: 2.5rem"
                  >
                    <div>
                      <h4
                        class="mb-0"
                        style="color: #225054; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ institutionName }}
                      </h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <h4
                        class="mb-0 ml-2"
                        style="color: #225054; font-size: 1.2rem; font-family: dimbo"
                      >
                        {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
                      </h4>
                      <img
                        style="height: 22px; width: 22px"
                        :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                        alt=""
                      />
                    </div>
                  </div>
                </template>
              </b-carousel-slide>
            </b-carousel>
          </div>
        </div>
      </div>
    </b-card>
  </SimpleTab>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import { SubjectEnum } from '@/consts/SubjectEnum.js'
import { formatNumber, formattedTime } from '@/filters/filters'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import { getSchoolEvidenceReport } from '@/services/shared/reports/Report.service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date.js'
import { replaceDotsAndCommas } from '@/utils/utils.js'
import AccessByDeviceGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/AccessByDeviceGraph.vue'
import AccessDistributionPrintGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/AccessDistributionPrintGraph.vue'
import EngagementByClassGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/EngagementByClassGraph.vue'
import EngagementGeneralGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/EngagementGeneralGraph.vue'
import GuidesByClassGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/GuidesByClassGraph.vue'
import GuidesCreatedByTeacherGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/GuidesCreatedByTeacherGraph.vue'
import InstitutionPerformanceGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/InstitutionPerformanceGraph.vue'
import TimeInGuideGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/TimeInGuideGraph.vue'
import TimeInIslandGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/TimeInIslandGraph.vue'
import * as Excel from 'exceljs/dist/exceljs.min'
import { saveAs } from 'file-saver'
import { computed, ref, watch } from 'vue'

const { subject, institution, fetchSubjects } = useFilters()
const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const whitelabelName = getWhitelabelConfig('name')

const yearNow = new Date().getFullYear()
const monthNow = new Date().getMonth() + 1

const loadingReport = ref(false)

const periodsList = [
  {
    id: 0,
    name: 'Mensal',
  },
]

const semesterList = [
  {
    id: 1,
    name: 'Primeiro Semestre',
  },
]

const filters = ref({
  ReportPeriod: {
    id: 0,
    name: 'Mensal',
  },
  year: yearNow,
  month: 1,
  semester: {
    id: 1,
    name: 'Primeiro Semestre',
  },
})

const yearList = computed(() => {
  const yearListArr = []
  for (let i = 2017; i <= yearNow; i += 1) {
    yearListArr.push(i)
  }
  return yearListArr
})

const monthList = ref([])

const institutionList = ref([])
const institutionListLoading = ref(false)

const reportData = ref([])
const totalTimeIslandSum = ref(0)
const totalTimeGuideSum = ref(0)

const reportDataExcel = ref([])
const loadingReportExcel = ref(false)

const validateMonth = () => {
  if (parseInt(filters.value.year, 10) === parseInt(yearNow, 10)) {
    if (parseInt(filters.value.month, 10) > parseInt(monthNow, 10)) {
      filters.value.month = 1
    }
  }
}

const generateMonths = () => {
  if (parseInt(filters.value.year, 10) === parseInt(yearNow, 10)) {
    monthList.value = getMonthList()
  } else {
    monthList.value = getMonthList(12)
  }
}

const changeInstitution = async data => {
  institution.value = { id: data?.id || data }
  await fetchSubjects()
}

const handleGetInstitutions = async () => {
  institutionListLoading.value = true

  const response = await getInstitutions()
  institutionList.value = response.data

  if (institutionList.value.length > 0) {
    institution.value = { id: institutionList.value[0].id }
  }

  institutionListLoading.value = false
}

const splitArrays = (data, size, splitedData) => {
  const forCount = Math.floor(data.length / size)
  for (let i = 0; i <= forCount; i += 1) {
    if (data.length >= 1) {
      splitedData.push(data.splice(0, 12))
    }
  }

  if (data.length > 0 && data.length < 12) {
    splitedData.push(data.splice(0, 12))
  }

  return splitedData
}

const handleGenerateReport = () => {
  reportData.value = []
  totalTimeIslandSum.value = 0
  totalTimeGuideSum.value = 0

  validateMonth()

  getSchoolEvidenceReport({
    ...filters.value,
    subjectId: subject.value.id,
    InstitutionId: institution.value.id,
  })
    .then(response => {
      reportData.value = response.data

      reportData.value.totalTimeIsland.forEach(element => {
        totalTimeIslandSum.value += element.time
      })

      reportData.value.totalTimeGuide.forEach(element => {
        totalTimeGuideSum.value += element.time
      })

const splitedTotalTimeIsland = []
      reportData.value.totalTimeIsland = splitArrays(
        reportData.value.totalTimeIsland,
        12,
        splitedTotalTimeIsland,
      )

      const splitedTotalTimeGuide = []
      reportData.value.totalTimeGuide = splitArrays(
        reportData.value.totalTimeGuide,
        12,
        splitedTotalTimeGuide,
      )

      const splitedClassGuides = []
      reportData.value.classGuides = splitArrays(
        reportData.value.classGuides,
        12,
        splitedClassGuides,
      )

      const splitedClassesEngagement = []
      reportData.value.classesEngagement = splitArrays(
        reportData.value.classesEngagement,
        12,
        splitedClassesEngagement,
      )

      reportData.value.teacherSendMissions = reportData.value.createdGuides.reduce(
        (acc, cur) => acc + cur.amountGuides,
        0,
      )
    })
    .catch(() => {
      reportData.value = []
      totalTimeIslandSum.value = 0
      totalTimeGuideSum.value = 0
    })
}

// Computed properties para ESelect - Instituicao
const institutionObject = computed(() => {
  if (!institution.value?.id) return null
  return institutionList.value.find(inst => inst.id === institution.value.id) || null
})

// Computed properties para ESelect - Ano
const yearListFormatted = computed(() => {
  return yearList.value.map(year => ({
    id: year,
    name: year.toString(),
  }))
})

const selectedYear = computed({
  get: () => {
    const year = filters.value.year
    return yearListFormatted.value.find(y => y.id === year) || null
  },
  set: value => {
    filters.value.year = value?.id || value
  },
})

const handleYearChange = value => {
  filters.value.year = value?.id || value
  handleGenerateReport()
}

// Computed properties para ESelect - Mes
const selectedMonth = computed({
  get: () => {
    const monthId = filters.value.month
    return monthList.value.find(m => m.id === monthId) || null
  },
  set: value => {
    filters.value.month = value?.id || value
  },
})

const handleMonthChange = value => {
  filters.value.month = value?.id || value
  handleGenerateReport()
}

// Computed properties para ESelect - Semestre
const selectedSemester = computed({
  get: () => {
    const semesterId = filters.value.semester
    return semesterList.find(s => s.id === semesterId) || null
  },
  set: value => {
    filters.value.semester = value?.id || value
  },
})

const handleSemesterChange = value => {
  filters.value.semester = value?.id || value
  handleGenerateReport()
}

const reportToPdf = () => {
  loadingReport.value = true
  getSchoolEvidenceReport({
    ...filters.value,
    subjectId: subject.value.id,
    InstitutionId: institution.value.id,
  })
    .then(response => {
      if (response.data) {
        router.push({
          name: 'schoolEvidencePDF',
          params: {
            pdfTitle: 'Evidencias Escolas',
            reportData: response.data,
            institutionName: institutionName.value,
            knowledgeArea: knowledgeAreaSelected.value,
          },
        })
      }
    })
    .finally(() => {
      loadingReport.value = false
    })
}

const exportToExcel = () => {
  loadingReportExcel.value = true
  getSchoolEvidenceReport({
    ...filters.value,
    subjectId: subject.value.id,
    InstitutionId: institution.value.id,
  })
    .then(async response => {
      reportDataExcel.value = response.data

      let rowCount = 0

      const wb = new Excel.Workbook()

      const ws = wb.addWorksheet('Relatório de evidências da Escola')
      ws.properties.defaultColWidth = 35

      // Educacross na sua Escola
      const title1 = ws.addRow([`${whitelabelName} na sua Escola`])
      rowCount += 1
      ws.mergeCells(`A${rowCount}:F${rowCount}`)
      title1.font = { bold: true, size: 12 }
      title1.alignment = { horizontal: 'center' }

      const subtitle1 = ws.addRow([
        'Horas de Aprendizagem',
        'Finalização de jogos dos alunos',
        'Total de Alunos que Jogaram',
        'Jogos Acessados',
        'Missões enviadas / habilitadas pelos professores',
        'Desafios Cumpridos',
      ])
      rowCount += 1
      subtitle1.font = { bold: true, size: 12 }
      subtitle1.alignment = { horizontal: 'center' }

      const text1 = ws.addRow([
        formattedTime(reportDataExcel.value.totalTime),
        `${formatNumber(reportDataExcel.value.engagementInstitution)}%`,
        `${formatNumber(reportDataExcel.value.amountStudentsPlayed)}/${formatNumber(
          reportDataExcel.value.amountStudents,
        )}`,
        formatNumber(reportDataExcel.value.activitiesPlayed),
        `${formatNumber(reportDataExcel.value.teacherSendMissions)}`,
        formatNumber(reportDataExcel.value.amountMissions),
      ])
      rowCount += 1
      text1.alignment = { horizontal: 'center' }

      ws.addRow()
      rowCount += 1

      // Engajamento dos Alunos
      const title2 = ws.addRow(['Alunos que finalizaram jogos'])
      rowCount += 1
      ws.mergeCells(`A${rowCount}:B${rowCount}`)
      title2.font = { bold: true, size: 12 }
      title2.alignment = { horizontal: 'center' }

      const subtitle2 = ws.addRow(['Período', 'Engajamento'])
      rowCount += 1
      subtitle2.font = { bold: true, size: 12 }
      subtitle2.alignment = { horizontal: 'center' }

      reportDataExcel.value.generalEngagement.forEach(element => {
        const text2 = ws.addRow([
          element.period,
          element.engagement !== 0 ? `${formatNumber(element.engagement)}%` : '0%',
        ])
        rowCount += 1
        text2.alignment = { horizontal: 'center' }
      })

      ws.addRow()
      rowCount += 1

      // Tempo de Estudo Autônomo: "Ilhas"
      const title3 = ws.addRow(['Tempo de estudo Autônomo nas Ilhas'])
      rowCount += 1
      ws.mergeCells(`A${rowCount}:B${rowCount}`)
      title3.font = { bold: true, size: 12 }
      title3.alignment = { horizontal: 'center' }

      const subtitle3 = ws.addRow(['Turma', 'Tempo'])
      rowCount += 1
      subtitle3.font = { bold: true, size: 12 }
      subtitle3.alignment = { horizontal: 'center' }

      reportDataExcel.value.totalTimeIsland.forEach(element => {
        const text3 = ws.addRow([element.className, formatTime(element.time)])
        rowCount += 1
        text3.alignment = { horizontal: 'center' }
      })

      ws.addRow()
      rowCount += 1

      // Tempo de Estudo Guiado pelo Professor: Missões
      const title4 = ws.addRow(['Tempo de Estudo em missões enviadas/habilitadas'])
      rowCount += 1
      ws.mergeCells(`A${rowCount}:B${rowCount}`)
      title4.font = { bold: true, size: 12 }
      title4.alignment = { horizontal: 'center' }

      const subtitle4 = ws.addRow(['Turma', 'Tempo'])
      rowCount += 1
      subtitle4.font = { bold: true, size: 12 }
      subtitle4.alignment = { horizontal: 'center' }

      reportDataExcel.value.totalTimeGuide.forEach(element => {
        const text4 = ws.addRow([element.className, formatTime(element.time)])
        rowCount += 1
        text4.alignment = { horizontal: 'center' }
      })

      ws.addRow()
      rowCount += 1

      // Total de Roteiros Criados
      const title5 = ws.addRow(['Total de missões habilitadas / enviadas por semana'])
      rowCount += 1
      ws.mergeCells(`A${rowCount}:B${rowCount}`)
      title5.font = { bold: true, size: 12 }
      title5.alignment = { horizontal: 'center' }

      const subtitle5 = ws.addRow(['Período', 'Missões Criadas'])
      rowCount += 1
      subtitle5.font = { bold: true, size: 12 }
      subtitle5.alignment = { horizontal: 'center' }

      reportDataExcel.value.createdGuides.forEach(element => {
        const text5 = ws.addRow([element.period, formatNumber(element.amountGuides)])
        rowCount += 1
        text5.alignment = { horizontal: 'center' }
      })

      ws.addRow()
      rowCount += 1

      // Roteiros Criados por Turma
      const title6 = ws.addRow(['Total de missões habilitadas / enviadas por turma'])
      rowCount += 1
      ws.mergeCells(`A${rowCount}:B${rowCount}`)
      title6.font = { bold: true, size: 12 }
      title6.alignment = { horizontal: 'center' }

      const subtitle6 = ws.addRow(['Turma', 'Quantidade de Missões'])
      rowCount += 1
      subtitle6.font = { bold: true, size: 12 }
      subtitle6.alignment = { horizontal: 'center' }

      reportDataExcel.value.classGuides.forEach(element => {
        const text4 = ws.addRow([element.className, formatNumber(element.amountGuides)])
        rowCount += 1
        text4.alignment = { horizontal: 'center' }
      })

      // Melhores Engajamentos - Turmas
      if (reportDataExcel.value.classesBetterEngagement.length > 0) {
        ws.addRow()
        rowCount += 1

        const title7 = ws.addRow(['Turmas com mais jogos finalizados'])
        rowCount += 1
        ws.mergeCells(`A${rowCount}:B${rowCount}`)
        title7.font = { bold: true, size: 12 }
        title7.alignment = { horizontal: 'center' }

        const subtitle7 = ws.addRow(['Turma', 'Engajamento'])
        rowCount += 1
        subtitle7.font = { bold: true, size: 12 }
        subtitle7.alignment = { horizontal: 'center' }

        reportDataExcel.value.classesBetterEngagement.forEach(element => {
          const text7 = ws.addRow([
            element.className,
            `${formatNumber(element.finishedActivities)}%`,
          ])
          rowCount += 1
          text7.alignment = { horizontal: 'center' }
        })
      }

      ws.addRow()
      rowCount += 1

      // Engajamento por Turma
      const title8 = ws.addRow(['Jogos finalizados por turma'])
      rowCount += 1
      ws.mergeCells(`A${rowCount}:B${rowCount}`)
      title8.font = { bold: true, size: 12 }
      title8.alignment = { horizontal: 'center' }

      const subtitle8 = ws.addRow(['Turma', 'Engajamento'])
      rowCount += 1
      subtitle8.font = { bold: true, size: 12 }
      subtitle8.alignment = { horizontal: 'center' }

      reportDataExcel.value.classesEngagement.forEach(element => {
        const text8 = ws.addRow([
          element.className,
          `${formatNumber(element.finishedActivities)}%`,
        ])
        rowCount += 1
        text8.alignment = { horizontal: 'center' }
      })

      ws.addRow()
      rowCount += 1

      // Desempenho Geral da Escola
      const title9 = ws.addRow(['Desempenho Geral da Escola'])
      rowCount += 1
      ws.mergeCells(`A${rowCount}:D${rowCount}`)
      title9.font = { bold: true, size: 12 }
      title9.alignment = { horizontal: 'center' }

      const subtitle9 = ws.addRow(['Avançado', 'Adequado', 'Básico', 'Abaixo do Básico'])
      rowCount += 1
      subtitle9.font = { bold: true, size: 12 }
      subtitle9.alignment = { horizontal: 'center' }

      const text9 = ws.addRow([
        `${formatNumber(reportDataExcel.value.institutionPerformance.advenced)}%`,
        `${formatNumber(reportDataExcel.value.institutionPerformance.suitable)}%`,
        `${formatNumber(reportDataExcel.value.institutionPerformance.basic)}%`,
        `${formatNumber(reportDataExcel.value.institutionPerformance.belowBasic)}%`,
      ])
      rowCount += 1
      text9.alignment = { horizontal: 'center' }

      ws.addRow()
      rowCount += 1

      // Acesso por dispositivos
      const title10 = ws.addRow(['Acesso por dispositivos'])
      rowCount += 1
      ws.mergeCells(`A${rowCount}:D${rowCount}`)
      title10.font = { bold: true, size: 12 }
      title10.alignment = { horizontal: 'center' }

      const subtitle10 = ws.addRow(['Android', 'Windows', 'Apple', 'Linux'])
      rowCount += 1
      subtitle10.font = { bold: true, size: 12 }
      subtitle10.alignment = { horizontal: 'center' }

      const text10 = ws.addRow([
        `${formatNumber(reportDataExcel.value.accessDevice.android)}%`,
        `${formatNumber(reportDataExcel.value.accessDevice.windows)}%`,
        `${formatNumber(reportDataExcel.value.accessDevice.apple)}%`,
        `${formatNumber(reportDataExcel.value.accessDevice.linux)}%`,
      ])
      rowCount += 1
      text10.alignment = { horizontal: 'center' }

      ws.addRow()
      rowCount += 1

      // Acessos por Período
      const title11 = ws.addRow(['Acessos por Período'])
      rowCount += 1
      ws.mergeCells(`A${rowCount}:D${rowCount}`)
      title11.font = { bold: true, size: 12 }
      title11.alignment = { horizontal: 'center' }

      const subtitle11 = ws.addRow(['Manhã', 'Tarde', 'Noite', 'Madrugada'])
      rowCount += 1
      subtitle11.font = { bold: true, size: 12 }
      subtitle11.alignment = { horizontal: 'center' }

      const text11 = ws.addRow([
        `${formatNumber(reportDataExcel.value.accessDistribution.morning)}%`,
        `${formatNumber(reportDataExcel.value.accessDistribution.afternoon)}%`,
        `${formatNumber(reportDataExcel.value.accessDistribution.night)}%`,
        `${formatNumber(reportDataExcel.value.accessDistribution.dawn)}%`,
      ])
      rowCount += 1
      text11.alignment = { horizontal: 'center' }

      ws.addRow()
      rowCount += 1

      const subtitle12 = ws.addRow([
        'Média de Tempo Jogado por Aluno',
        'Média de Missões por Turma',
      ])
      rowCount += 1
      subtitle12.font = { bold: true, size: 12 }
      subtitle12.alignment = { horizontal: 'center' }

      const text12 = ws.addRow([
        formatNumber(reportDataExcel.value.averageTimeByStudent),
        formatNumber(reportDataExcel.value.averageGuidesByClass),
      ])
      rowCount += 1
      text12.alignment = { horizontal: 'center' }

      const buf = await wb.xlsx.writeBuffer()

      saveAs(new Blob([buf]), 'Evidências Escola.xlsx')
    })
    .finally(() => {
      loadingReportExcel.value = false
    })
}

const convertSeconds = number => {
  if (number === 0) {
    return 0
  }
  let hours = 0
  let seconds = parseInt(number, 10)
  hours = Math.floor(seconds / 3600)
  seconds -= hours * 3600
  const minutes = Math.floor(seconds / 60)
  seconds -= minutes * 60

  if (hours !== 0) {
    return `${hours}h ${minutes}m`
  }
  if (hours === 0 && minutes !== 0) {
    return `${minutes}m`
  }
  if (hours === 0 && minutes === 0) {
    return `${seconds}s`
  }
  return 0
}
const formatTime = value => {
  if (value === 0) {
    return 0
  }
  let seconds = parseInt(value, 10)
  const hours = Math.floor(seconds / 3600)
  seconds -= hours * 3600

  const minutes = Math.floor(seconds / 60)
  seconds -= minutes * 60

  if (hours !== 0) {
    return `${hours} H ${minutes} Min`
  }

  if (hours === 0 && minutes !== 0) {
    return `${minutes} Min`
  }

  if (hours === 0 && minutes === 0 && seconds !== 0) {
    return `${seconds} Seg`
  }

  if (hours === 0 && minutes === 0 && seconds === 0) {
    return 0
  }
  return 0
}

// CREATED
if (monthNow > 6) {
  periodsList.push({
    id: 1,
    name: 'Semestral',
  })
}

generateMonths()
validateMonth()

if (isNetworkManager) {
  handleGetInstitutions().then(() => {
    fetchSubjects()
  })
}

watch(
  subject,
  () => {
    if (subject.value.id) handleGenerateReport()
  },
  { deep: true },
)

const institutionName = computed(() => {
  if (isNetworkManager) {
    const selectedInstitution = institutionList.value.filter(
      item => item.id === institution.value.id,
    )

    if (!selectedInstitution.length > 0) return ''

    return selectedInstitution[0]?.name
  }
  return store.state.access.userData.InstitutionName
})
const knowledgeAreaSelected = computed(() => {
  if (subject.value.id === null) return null
  return SubjectEnum[subject.value.id]
})

</script>

<style lang="scss" scoped>
  /* Conteúdo */
  .evidence-list-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    color: #2c2c2c;
  }

  /* Slider */
  .card-body-school {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    @media (max-width: 720px) {
      overflow: hidden;
      width: min-content;
    }
  }

  .button-content {
    width: 100%;
    text-align: center;
    padding-bottom: 1rem;
    padding-top: 1rem;
  }

  .carousel-width {
    width: 836px;
  }

  .slide-title {
    position: absolute;
    text-align: center;
    width: 100%;
    top: calc(50% - 2.5rem);
    font-size: 5rem;

    span {
      color: #225054;
      font-family: dimbo;
    }
  }

  .institution-name {
    color: #225054;
    font-size: 2rem;
    font-family: dimbo;
  }

  .graphs-content {
    position: absolute;
    width: 80%;
    top: 21%;
    left: 10%;
  }

  .engagement {
    position: absolute;
    height: 0;
    top: 0%;
    width: 100%;
    font-size: 6rem;
    display: flex;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
  }

  .missionsAndStudents {
    position: absolute;
    top: 47%;
    width: 100%;
    text-align: center;
    font-size: 2.5rem;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 23rem;
  }

  .gameplayTime {
    width: 100%;
    justify-self: start;
    position: absolute;
    top: 14%;
    text-align: center;
    font-size: 2.5rem;
  }

  .gamesAccessed {
    justify-self: start;
    position: absolute;
    top: 31%;
    font-size: 2.5rem;
    width: 54%;
    text-align: center;
  }

  .activities {
    width: 50%;
    justify-self: start;
    position: absolute;
    top: 59%;
    text-align: center;
    font-size: 2.5rem;
  }

  .engagement-missions-general {
    position: absolute;
    text-align: center;
    height: 0;
    width: 100%;
    top: 5%;
    font-size: 2.5rem;
    right: 0;
    color: #ffc000;
    font-family: dimbo;
  }

  .topClasses {
    text-align: center;
    position: absolute;
    width: 100%;
    top: 35%;
    font-size: 2.5rem;
    color: #ffc000;
    height: 0;
  }

  .institutionEngagement {
    width: 66%;
    justify-self: start;
    position: absolute;
    top: 10%;
    left: 2%;
    text-align: center;
    font-size: 2.5rem;
  }

  .averageTimePlayedStudent {
    width: 50%;
    justify-self: start;
    position: absolute;
    top: 36%;
    text-align: center;
    font-size: 2.5rem;
    left: 31%;
  }

  .averageGuidesClass {
    width: 55%;
    justify-self: start;
    position: absolute;
    top: 68%;
    text-align: center;
    font-size: 2.5rem;
    right: 2%;
  }

  .carousel-caption {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: -0.8rem;
  }

  .period-chosen-green {
    color: #225054;
    font-family: dimbo;
  }

  .period-chosen-white {
    color: white;
    font-family: dimbo;
  }
</style>