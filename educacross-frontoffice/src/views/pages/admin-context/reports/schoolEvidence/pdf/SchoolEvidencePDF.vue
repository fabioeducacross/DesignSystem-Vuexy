<template>
  <div>
    <div class="cardBodyCustomClass">
      <!-- Slide 1 -->
      <div class="cardBody">
        <div class="customPdfBody">
          <div class="firstSlideTitle">
            <span style="color: #225054; font-family: dimbo">Relatório de Evidências</span>
          </div>
          <div class="reportDataSizePosition" style="top: 85%">
            <p style="font-family: dimbo; color: #225054; font-family: dimbo; font-size: 2rem">
              {{ reportData.institutionName ? reportData.institutionName : '' }}
            </p>
            <span style="color: #225054; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div target="_blank" rel="nofollow noopener noreferrer">
            <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
              <img
                class="background-slide"
                width="1003.52px"
                height="705px"
                :src="imageSlide1"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 2 -->
      <div class="cardBody">
        <div class="customPdfBody position-relative">
          <div class="engagement">
            <div style="color: #225054; font-size: 5rem; font-family: dimbo">
              Evidências na Escola
            </div>
          </div>
          <div class="gameplayTime" style="top: 25%">
            <div
              style="
                color: #225054;
                padding-left: 12rem;
                position: relative;
                width: 100%;
                text-align: center;
                top: 42%;
                font-size: 2.5rem;
                font-family: dimbo;
              "
            >
              Horas de Aprendizagem
              <div style="color: #784421; font-size: 2.5rem; font-family: dimbo">
                {{ reportData.totalTime ? convertSeconds(reportData.totalTime) : 0 }}
              </div>
            </div>
          </div>

          <div class="missionsAndStudents">
            <div style="width: 100%; display: flex; flex-wrap: wrap; font-family: dimbo">
              <span style="width: 100%; color: #225054; text-align: center; font-family: dimbo"
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
              >
                {{ reportData.engagementInstitution | formatNumber }}%
              </span>
            </div>
            <div style="width: 100%; display: flex; flex-wrap: wrap; font-family: dimbo">
              <span style="width: 100%; color: #225054; text-align: center; font-family: dimbo"
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
                >{{ reportData.amountStudentsPlayed | formatNumber }} /
                {{ reportData.amountStudents | formatNumber }}</span
              >
            </div>
          </div>

          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: #225054; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div target="_blank" rel="nofollow noopener noreferrer">
            <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
              <img
                class="background-slide"
                width="1003.52px"
                height="705px"
                :src="imageSlide3"
                alt=""
              />
            </div>
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 3rem"
          >
            <div>
              <h4 class="mb-0" style="color: #225054; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: #225054; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 3 -->
      <div class="cardBody">
        <div class="customPdfBody position-relative">
          <div class="gameplayTime">
            <div style="color: #225054; text-align: center; font-family: dimbo">
              Jogos Acessados
            </div>
            <div style="color: #784421; text-align: center; font-family: dimbo">
              {{ reportData.activitiesPlayed | formatNumber }}
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

          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: #225054; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>

          <div target="_blank" rel="nofollow noopener noreferrer">
            <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
              <img
                class="background-slide"
                width="1003.52px"
                height="705px"
                :src="imageSlide4"
                alt=""
              />
            </div>
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 3rem"
          >
            <div>
              <h4 class="mb-0" style="color: #225054; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: #225054; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 4 -->
      <div class="cardBody">
        <div class="customPdfBody position-relative">
          <div class="engagementGeneral" style="font-family: dimbo">
            Alunos que finalizaram jogos
          </div>
          <div class="graph">
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
          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: white; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
            <img
              class="background-slide"
              width="1003.52px"
              height="705px"
              :src="imageSlide7"
              alt=""
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 3rem"
          >
            <div>
              <h4 class="mb-0" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 5 -->
      <div class="cardBody">
        <div class="customPdfBody position-relative">
          <div
            v-if="reportData.institutionSelected !== 0"
            class="engagementGeneral"
            style="font-family: dimbo"
          >
            Turmas com mais jogos finalizados
          </div>
          <div
            v-if="reportData.institutionSelected === 0"
            class="engagementGeneral"
            style="font-family: dimbo"
          >
            Escolas com mais jogos finalizados
          </div>
          <div class="topClasses">
            <div
              v-if="
                reportData.classesBetterEngagement
                  ? reportData.classesBetterEngagement.length < 1 &&
                    reportData.institutionSelected !== 0
                  : reportData.institutionSelected !== 0
              "
              style="font-size: 2.5rem; font-family: dimbo"
            >
              Nenhuma turma
            </div>
            <div
              v-if="
                reportData.classesBetterEngagement
                  ? reportData.classesBetterEngagement.length < 1 &&
                    reportData.institutionSelected === 0
                  : reportData.institutionSelected === 0
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
              {{ knowledgeClasses.finishedActivities | formatNumber }}%
            </div>
          </div>
          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: white; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
            <img
              class="background-slide"
              width="1003.52px"
              height="705px"
              :src="imageSlide7"
              alt=""
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 3rem"
          >
            <div>
              <h4 class="mb-0" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 6 -->
      <div
        v-for="(knowledgeClassesEngagement, indexClassesEngagement) in reportData.classesEngagement"
        :key="'B' + indexClassesEngagement"
        class="cardBody position-relative"
      >
        <div class="customPdfBody">
          <div
            v-if="reportData.institutionSelected !== 0"
            class="engagementGeneral"
            style="font-family: dimbo"
          >
            Jogos finalizados por turma
          </div>
          <div
            v-if="reportData.institutionSelected === 0"
            class="engagementGeneral"
            style="font-family: dimbo"
          >
            Jogos finalizados por Escola
          </div>
          <div class="graph">
            <engagement-by-class-graph
              :reports="
                reportData.classesEngagement
                  ? reportData.classesEngagement[indexClassesEngagement]
                  : []
              "
            />
          </div>
          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: white; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
            <img
              class="background-slide"
              width="1003.52px"
              height="705px"
              :src="imageSlide7"
              alt=""
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 3rem"
          >
            <div>
              <h4 class="mb-0" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 7 -->
      <div
        v-for="(knowledgeTotalTimeIsland, indexTotalTimeIsland) in reportData.totalTimeIsland"
        :key="'C' + indexTotalTimeIsland"
        class="cardBody position-relative"
      >
        <div class="customPdfBody">
          <div class="engagementGeneral" style="font-family: dimbo; top: 10%">
            Tempo de estudo Autônomo nas Ilhas
          </div>
          <div class="graph">
            <time-in-island-graph
              :reports="
                reportData.totalTimeIsland ? reportData.totalTimeIsland[indexTotalTimeIsland] : []
              "
            />
            <div
              style="
                width: 100%;
                font-size: 2rem;
                color: white;
                text-align: center;
                font-family: dimbo;
              "
            >
              Total: {{ convertSeconds(totalTimeIslandSum) }}
            </div>
          </div>
          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: white; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
            <img
              class="background-slide"
              width="1003.52px"
              height="705px"
              :src="imageSlide7"
              alt=""
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 3rem"
          >
            <div>
              <h4 class="mb-0" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 8 -->
      <div
        v-for="(knowledgeTotalTimeGuide, indexTotalTimeGuide) in reportData.totalTimeGuide"
        :key="'D' + indexTotalTimeGuide"
        class="cardBody position-relative"
      >
        <div class="customPdfBody">
          <div class="engagementGeneral" style="padding-right: 3rem; font-family: dimbo; top: 10%">
            Tempo de Estudo em missões enviadas/habilitadas
          </div>
          <div class="graph">
            <time-in-guide-graph
              :reports="
                reportData.totalTimeGuide ? reportData.totalTimeGuide[indexTotalTimeGuide] : []
              "
            />
            <div
              style="
                width: 100%;
                font-size: 2rem;
                color: white;
                text-align: center;
                font-family: dimbo;
              "
            >
              Total: {{ convertSeconds(totalTimeGuideSum) }}
            </div>
          </div>
          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: white; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
            <img
              class="background-slide"
              width="1003.52px"
              height="705px"
              :src="imageSlide7"
              alt=""
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 3rem"
          >
            <div>
              <h4 class="mb-0" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 9 -->
      <div class="cardBody">
        <div class="customPdfBody position-relative">
          <div class="engagementGeneral" style="font-family: dimbo">
            Total de missões habilitadas/enviadas <br /><span style="font-family: dimbo"
              >(Por semana)</span
            >
          </div>

          <div class="graph">
            <guides-created-by-teacher-graph
              :reports="
                reportData.createdGuides ? reportData.createdGuides.map(reports => reports) : []
              "
            />
          </div>
          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: white; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
            <img
              class="background-slide"
              width="1003.52px"
              height="705px"
              :src="imageSlide7"
              alt=""
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 3rem"
          >
            <div>
              <h4 class="mb-0" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 10 -->
      <div
        v-for="(knowledgeClassGuides, indexClassGuides) in reportData.classGuides"
        :key="'E' + indexClassGuides"
        class="cardBody position-relative"
      >
        <div class="customPdfBody">
          <div class="engagementGeneral" style="font-family: dimbo">
            Total de missões habilitadas/enviadas <br /><span style="font-family: dimbo"
              >(Por semana)</span
            >
          </div>

          <div class="graph">
            <guides-by-class-graph :reports="knowledgeClassGuides" />
          </div>
          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: white; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
            <img
              class="background-slide"
              width="1003.52px"
              height="705px"
              :src="imageSlide7"
              alt=""
            />
          </div>
        </div>
        <div
          class="d-flex align-items-center justify-content-between w-75"
          style="position: absolute; left: 100px; bottom: 3rem"
        >
          <div>
            <h4 class="mb-0" style="color: white; font-size: 1.2rem; font-family: dimbo">
              {{ institutionName }}
            </h4>
          </div>
          <div class="d-flex align-items-center gap-2">
            <h4 class="mb-0 ml-2" style="color: white; font-size: 1.2rem; font-family: dimbo">
              {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
            </h4>
            <img
              style="height: 22px; width: 22px"
              :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- Slide 11 -->
      <div class="cardBody">
        <div class="customPdfBody position-relative">
          <div class="engagementGeneral" style="font-family: dimbo">Desempenho Geral da Escola</div>
          <div class="graph">
            <institution-performance-graph
              :reports="reportData.institutionPerformance ? reportData.institutionPerformance : {}"
            />
          </div>
          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: white; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
            <img
              class="background-slide"
              width="1003.52px"
              height="705px"
              :src="imageSlide7"
              alt=""
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 3rem"
          >
            <div>
              <h4 class="mb-0" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 12 -->
      <div class="cardBody">
        <div class="customPdfBody position-relative">
          <div class="engagementGeneral" style="font-family: dimbo">Acessos por Dispositivo</div>
          <div class="graph">
            <access-by-device-graph
              :reports="reportData.accessDevice ? reportData.accessDevice : {}"
            />
          </div>
          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: white; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
            <img
              class="background-slide"
              width="1003.52px"
              height="705px"
              :src="imageSlide7"
              alt=""
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 3rem"
          >
            <div>
              <h4 class="mb-0" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 13 -->
      <div class="cardBody">
        <div class="customPdfBody position-relative">
          <div class="engagementGeneral" style="font-family: dimbo">Distribuição de Acessos</div>
          <div class="graph">
            <access-distribution-print-graph
              :reports="reportData.accessDistribution ? reportData.accessDistribution : {}"
            />
          </div>
          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: white; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
            <img
              class="background-slide"
              width="1003.52px"
              height="705px"
              :src="imageSlide7"
              alt=""
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 3rem"
          >
            <div>
              <h4 class="mb-0" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 14 -->
      <div class="cardBody">
        <div class="customPdfBody position-relative">
          <div class="institutionEngagement">
            <div style="color: #ffc000; font-family: dimbo">
              {{
                reportData.averageTimeByStudent
                  ? convertSeconds(reportData.averageTimeByStudent)
                  : 0
              }}
            </div>
            <div style="color: white; font-family: dimbo">Média de Tempo Jogado por Aluno</div>
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
          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: white; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
            <img
              class="background-slide"
              width="1003.52px"
              height="705px"
              :src="imageSlide19"
              alt=""
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 2rem"
          >
            <div>
              <h4 class="mb-0" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: white; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 15 -->
      <div class="cardBody position-relative">
        <div class="customPdfBody">
          <div class="reportDataSizePosition" style="top: 90%">
            <span style="color: #225054; font-family: dimbo; font-size: 1.5rem">{{
              reportData.periodChosen
            }}</span>
          </div>
          <div class="picsum-img-wrapper" style="display: flex; justify-content: center">
            <img
              class="background-slide"
              width="1003.52px"
              height="705px"
              :src="imageRelatorioFim"
              alt=""
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between w-75"
            style="position: absolute; left: 100px; bottom: 3rem"
          >
            <div>
              <h4 class="mb-0" style="color: #225054; font-size: 1.2rem; font-family: dimbo">
                {{ institutionName }}
              </h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="mb-0 ml-2" style="color: #225054; font-size: 1.2rem; font-family: dimbo">
                {{ knowledgeAreaSelected ? knowledgeAreaSelected.label : '' }}
              </h4>
              <img
                style="height: 22px; width: 22px"
                :src="knowledgeAreaSelected ? knowledgeAreaSelected.image : null"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatNumber } from '@/filters/filters'
import AccessByDeviceGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/AccessByDeviceGraph.vue'
import AccessDistributionPrintGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/AccessDistributionPrintGraph.vue'
import EngagementByClassGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/EngagementByClassGraph.vue'
import EngagementGeneralGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/EngagementGeneralGraph.vue'
import GuidesByClassGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/GuidesByClassGraph.vue'
import GuidesCreatedByTeacherGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/GuidesCreatedByTeacherGraph.vue'
import InstitutionPerformanceGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/InstitutionPerformanceGraph.vue'
import TimeInGuideGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/TimeInGuideGraph.vue'
import TimeInIslandGraph from '@/views/pages/admin-context/reports/schoolEvidence/charts/TimeInIslandGraph.vue'
import imageSlide1 from '@/assets/images/relatorioEvidencias/slide1.png'
import imageSlide3 from '@/assets/images/relatorioEvidencias/slide3.png'
import imageSlide4 from '@/assets/images/relatorioEvidencias/slide4.png'
import imageSlide7 from '@/assets/images/relatorioEvidencias/slide7.png'
import imageSlide19 from '@/assets/images/relatorioEvidencias/slide19.png'
import imageRelatorioFim from '@/assets/images/relatorioEvidencias/relatorioFim.png'
import { useRoute, useRouter } from 'vue-router/composables'

const props = defineProps({})
const emit = defineEmits(['setInfos'])

const route = useRoute()
const router = useRouter()
const routeParams = (route && route.params) || {}

const reportData = ref([])
const institutionName = ref('')
const knowledgeAreaSelected = ref(null)
const totalTimeIslandSum = ref(0)
const totalTimeGuideSum = ref(0)

function convertSeconds(number) {
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
}

function formatTime(value) {
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
}

function splitArrays(data, size, splitedData) {
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

if (routeParams.pdfTitle !== undefined) {
  reportData.value = routeParams.reportData
  institutionName.value = routeParams.institutionName
  knowledgeAreaSelected.value = routeParams.knowledgeArea

  emit('setInfos', {
    pdfTitle: routeParams.pdfTitle,
    massPdf: false,
  })

  if (
    reportData.value &&
    Array.isArray(reportData.value.totalTimeGuide)
  ) {
    reportData.value.totalTimeGuide.forEach(element => {
      totalTimeGuideSum.value += element.time
    })
  }
  if (
    reportData.value &&
    Array.isArray(reportData.value.totalTimeIsland)
  ) {
    reportData.value.totalTimeIsland.forEach(element => {
      totalTimeIslandSum.value += element.time
    })
  }

  // Defensive: may be undefined if not present
  if (
    reportData.value &&
    Array.isArray(reportData.value.totalTimeIsland)
  ) {
    const splitedTotalTimeIsland = []
    reportData.value.totalTimeIsland = splitArrays(
      reportData.value.totalTimeIsland,
      12,
      splitedTotalTimeIsland,
    )
  }

  if (
    reportData.value &&
    Array.isArray(reportData.value.totalTimeGuide)
  ) {
    const splitedTotalTimeGuide = []
    reportData.value.totalTimeGuide = splitArrays(
      reportData.value.totalTimeGuide,
      12,
      splitedTotalTimeGuide,
    )
  }

  if (
    reportData.value &&
    Array.isArray(reportData.value.classGuides)
  ) {
    const splitedClassGuides = []
    reportData.value.classGuides = splitArrays(
      reportData.value.classGuides,
      12,
      splitedClassGuides,
    )
  }

  if (
    reportData.value &&
    Array.isArray(reportData.value.classesEngagement)
  ) {
    const splitedClassesEngagement = []
    reportData.value.classesEngagement = splitArrays(
      reportData.value.classesEngagement,
      12,
      splitedClassesEngagement,
    )
  }

  if (
    reportData.value &&
    Array.isArray(reportData.value.createdGuides)
  ) {
    reportData.value.teacherSendMissions = reportData.value.createdGuides.reduce(
      (acc, cur) => acc + cur.amountGuides,
      0,
    )
  }
} else {
  reportData.value = []
  router.push({ name: 'listReportSchoolEvidence' })
}
</script>

<style lang="scss" scoped>
  .cardBodyCustomClass {
    display: flex;
    flex-direction: column;
    row-gap: 4rem;
  }

  .customPdfBody {
    width: 100%;
  }

  .customCardPage {
    margin-bottom: 0;
    width: 100%;
    min-width: 477.875px;
    height: 100%;
    min-height: 100vh;
    border: none;
  }

  @media print {
    .printOcult {
      display: none !important;
    }
  }

  .full-width {
    flex: 1;
    min-width: 220px;
  }

  .firstSlideTitle {
    position: relative;
    text-align: center;
    width: 100%;
    top: calc(50% - 2.5rem);
    font-size: 6rem;
    height: 0;
  }

  .customHiddenSlide1 {
    position: absolute;
    background-color: black;
    width: 584px;
    height: 705px;
    margin-left: 292px;
  }

  .customHiddenSlide2 {
    position: absolute;
    background-color: black;
    width: 292px;
    height: 705px;
    margin-left: 584px;
  }

  .customShadowSlide2 {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 292px;
    height: 705px;
  }

  .customShadowSlide3 {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 584px;
    height: 705px;
  }

  .fixedColor {
    color: #fec000;
    text-shadow: 2px 2px rgba(0, 0, 0, 0.4);
    font-family: Sniglet;
  }

  .cardBody {
    position: relative;
    width: 1003.52px;
    height: 705px;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    break-inside: avoid;
    page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    -moz-column-break-inside: avoid;
    -o-column-break-inside: avoid;
    -ms-column-break-inside: avoid;
  }

  .reportDataSizePosition {
    position: relative;
    text-align: center;
    height: 0;
    top: 89%;
    z-index: 10;
    color: #fff;
  }

  .engagement {
    position: relative;
    height: 0;
    width: 100%;
    font-size: 6rem;
    display: flex;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
  }

  .missionsAndStudents {
    position: relative;
    height: 0;
    top: 42%;
    width: 100%;
    text-align: center;
    font-size: 2.5rem;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 28rem;
  }

  .gameplayTime {
    position: relative;
    justify-self: start;
    height: 0;
    width: 100%;
    top: 14%;
    text-align: center;
    font-size: 2.5rem;
  }

  .gamesAccessed {
    position: relative;
    justify-self: start;
    height: 0;
    width: 60%;
    top: 31%;
    text-align: center;
    font-size: 2.5rem;
    padding-right: 5rem;
  }

  .activities {
    position: relative;
    justify-self: start;
    height: 0;
    width: 49%;
    top: 59%;
    text-align: center;
    font-size: 2.5rem;
  }

  .teacherActivitiesCompletedPercentage {
    position: relative;
    justify-self: start;
    text-align: center;
    height: 0;
    width: 100%;
    top: 26%;
    font-size: 7.2rem;
  }

  .engagementGeneral {
    position: relative;
    text-align: center;
    height: 0;
    width: 100%;
    top: 5%;
    font-size: 2.5rem !important;
    right: 0;
    color: #ffc000;
  }

  .graph {
    position: relative;
    height: 0;
    width: 90%;
    top: 25%;
    left: 5%;
  }

  .institutionEngagement {
    position: relative;
    justify-self: start;
    height: 0;
    width: 100%;
    top: 8%;
    left: 3%;
    text-align: center;
    font-size: 4.8rem;
    padding-right: 18rem;
  }

  .averageTimePlayedStudent {
    position: relative;
    justify-self: start;
    height: 0;
    width: 54%;
    margin-left: 19rem;
    top: 34%;
    text-align: center;
    font-size: 4.8rem;
  }

  .averageGuidesClass {
    position: relative;
    justify-self: start;
    height: 0;
    width: 100%;
    padding-left: 26rem;
    top: 69%;
    text-align: center;
    font-size: 3.8rem;
  }

  .CardBodyCustomClass {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1.25rem 0;
    @media (max-width: 720px) {
      overflow: hidden;
      width: min-content;
    }
  }

  .tablePerformance {
    left: 0;
    display: flex;
    justify-content: center;
  }

  .topClasses {
    text-align: center;
    position: relative;
    width: 100%;
    top: 35%;
    font-size: 2.5rem;
    color: #ffc000;
    height: 0;
  }

  .background-slide {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
</style>