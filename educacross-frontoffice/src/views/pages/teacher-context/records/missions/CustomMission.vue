<template>
  <section id="customMission">
    <div
      v-if="$can(ACTION.READ, PERMISSION.MODULE.SUGGEST_GUIDE)"
      class="suggest-mission-container"
    >
      <span
        v-b-tooltip.left="
          'Ao clicar no botão, um conjunto de jogos será sugerido automaticamente com base nos jogos que você selecionou como referência.'
        "
        class="d-inline-block"
      >
        <b-button
          v-if="changeSuggestedMissions"
          :disabled.sync="changeAllSuggestionController"
          class="suggest-mission"
          variant="warning"
          @click.stop="changeSuggest"
        >
          <div class="d-flex align-items-center gap-2">
            <span class="material-symbols-outlined text-black"> autorenew </span>
            <span class="text-black">Trocar sugestão</span>
          </div>
        </b-button>
      </span>

      <span
        v-if="maximumSelectionReached"
        v-b-tooltip.left="sugestButtonTooltip"
        class="d-inline-block"
      >
        <b-button
          :class="changeSuggestedMissions ? 'change-suggest' : 'suggest-mission'"
          :disabled="showMissionSuggestButton"
          :variant="amountSuggested ? 'orange' : 'warning'"
          class=""
          @click.stop="suggestMission"
        >
          <div class="d-flex align-items-center gap-2">
            <span class="material-symbols-outlined text-black">
              {{
                amountSuggested > 0 && maximumSelectionReached ? 'rotate_right' : 'emoji_objects'
              }}
            </span>
            <span class="text-black">{{
              amountSuggested > 0 && maximumSelectionReached
                ? 'Completar sugestão'
                : 'Sugerir missão'
            }}</span>
          </div>
        </b-button>
      </span>
    </div>
    <div class="d-flex justify-between items-center">
      <p class="title-customMission">Nova missão personalizada</p>
    </div>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-row>
          <b-col cols="12" md="8">
            <b-skeleton class="w-100 mb-2" height="50px" type="text" />
            <b-skeleton class="w-100 mb-2" height="200px" type="text" />
            <b-skeleton class="w-100 mb-2" height="250px" type="text" />
          </b-col>
          <b-col cols="12" md="4">
            <b-skeleton class="w-100 mb-2" height="50px" type="text" />
            <b-skeleton class="w-100 mb-2" height="50px" type="text" />
            <b-skeleton class="w-100 mb-2" height="50px" type="text" />
            <b-skeleton class="w-100 mb-2" height="50px" type="text" />
            <b-skeleton class="w-100 mb-2" height="50px" type="text" />
            <b-skeleton class="w-100 mb-2" height="50px" type="text" />
            <b-skeleton class="w-100 mb-2" height="50px" type="text" />
            <b-skeleton class="w-100 mb-2" height="50px" type="text" />
          </b-col>
        </b-row>
      </template>
      <ValidationObserver ref="customMissionForm">
        <b-form @submit.prevent>
          <div class="container-customMission flex">
            <div class="w-full col-md-8">
              <b-card>
                <b-row class="gap-1">
                  <b-col cols="12" md="12" lg="auto">
                    <SelectSubject />
                  </b-col>
                  <b-col cols="12" md>
                    <b-form-group
                      id="subject-group"
                      class="filters-form-items"
                      label="Nome da missão*"
                      label-for="missionName"
                    >
                      <ValidationProvider
                        ref="missionNameValidate"
                        v-slot="{ errors }"
                        name="nome da missão"
                        rules="required|max:50"
                      >
                        <b-form-input
                          v-model="formFinishInfo.missionName"
                          :state="errors.length > 0 ? false : null"
                          autocomplete="off"
                          class="w-full filter-chooser filter-items"
                          maxlength="50"
                          placeholder="Digite o nome da missão"
                          required
                          type="text"
                        />
                        <small v-for="(error, index) in errors" :key="index" class="text-danger">
                          {{ error }}
                        </small>
                      </ValidationProvider>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>
              <div class="d-flex flex-wrap justify-between items-center">
                <p class="subtitle-customMission labelStyle mt-1">
                  Jogos selecionados
                  <span class="text-primary"
                    >{{ selectedActivities.length }}/{{ maxActivities }}</span
                  >
                </p>
                <p v-if="totalTimeSelectedActivities > 0" class="text-customMission font-semibold">
                  Tempo estimado:
                  <span class="text-primary">
                    {{ $options.filters.formattedTime(totalTimeSelectedActivities) }} ~
                    {{ $options.filters.formattedTime(totalTimeSelectedActivitiesDoubled) }}
                  </span>
                </p>
              </div>
              <b-card class="card-selectedActivities">
                <LoadingInComponent ref="loadingInSelectedActivitiesComponet" background="#fff">
                  <div class="d-flex justify-content-end">
                    <span
                      v-b-tooltip="
                        `Boas práticas ao escolher os jogos:

- Selecione de 5 a 7 jogos variados

- Evite selecionar diferentes níveis de um mesmo jogo

- Não ultrapasse 50 minutos de tempo estimado`
                      "
                      class="material-symbols-outlined ml-50"
                      style="font-size: 16px"
                    >
                      info
                    </span>
                  </div>
                  <div v-if="selectedActivities.length === 0" class="mt-16">
                    <p class="text-customMission text-center">Nenhum jogo selecionado.</p>
                  </div>
                  <draggable
                    v-else
                    :group="{ name: 'selectedActivities' }"
                    :list="selectedActivities"
                    class="w-full flex selectedGames"
                  >
                    <div
                      v-for="(activitySelected, indexActivitySelected) in selectedActivities"
                      :key="indexActivitySelected"
                      :class="{
                        suggestedItem: activitySelected.suggested,
                      }"
                      class="d-flex flex-col gameIcons activity-container"
                    >
                      <b-avatar
                        :src="activitySelected.imageUrl"
                        class="activity-image cursor-move"
                        rounded="lg"
                        size="100px"
                        variant="light-success"
                      />
                      <div
                        class="d-flex align-items-center justify-content-center gap-2 details-container cursor-pointer"
                      >
                        <b-icon icon="info-circle" variant="primary" />
                        <span
                          class="text-primary font-weight-normal"
                          @click="showActivityDetail(activitySelected.activityId)"
                          >Ver detalhes</span
                        >
                      </div>

                      <span
                        class="material-symbols-outlined remove-activity-icon icon-deleteActivity"
                        @click="removeSelectedActivity(activitySelected)"
                      >
                        close
                      </span>
                    </div>
                  </draggable>
                </LoadingInComponent>
              </b-card>
              <div v-if="amountSuggested > 0" class="mission-suggest-tip">
                <span class="material-symbols-outlined mr-50"> emoji_objects </span>
                <span>
                  O limite da “Sugestão de missão” é de
                  {{ totalQTDMissionsBySubject }} jogos, de acordo com o jogo que você selecionou,
                  foram sugeridos mais {{ amountSuggested }} jogos para formar a sua missão. Você
                  pode acrescentar mais de {{ totalQTDMissionsBySubject }} jogos, retirar os que
                  foram selecionados e clicar novamente nos botões “Trocar toda a sugestão” ou
                  “Completar a sugestão” para que novos jogos sejam sugeridos para você.
                </span>
              </div>
              <div class="d-flex flex-wrap justify-between items-center">
                <p class="subtitle-customMission labelStyle mt-1 d-flex align-content-center">
                  Selecione os jogos que deseja adicionar a missão*
                  <span
                    v-b-tooltip.hover="
                      `Boas práticas ao escolher jogos: selecione de 3 a ${totalQTDMissionsBySubject} jogos variados. Evite selecionar diferentes níveis de um mesmo jogo. Longas sessões com jogos não são recomendadas, portanto, esteja atento limite máximo de ${totalQTDMissionsBySubject} jogos por missão.`
                    "
                    class="material-symbols-outlined ml-50 head-icon-info"
                    style="font-size: 16px"
                  >
                    info
                  </span>
                </p>
              </div>
              <b-card>
                <CustomMissionFilters v-model="params" :type-query="typeQuery()" />

                <b-alert
                  v-model="fullActivities"
                  v-height-fade.appear
                  class="mb-0"
                  variant="primary"
                >
                  <div class="alert-body">
                    <span class="font-weight-normal"
                      >Você atingiu o limite máximo de {{ totalQTDMissionsBySubject }} jogos por
                      missão. Retire um jogo para adicionar algo novo.</span
                    >
                  </div>
                </b-alert>

                <div class="d-flex items-center justify-end mt-2">
                  <div class="iconsContainer-chooseHowShowActivity">
                    <span
                      :class="{
                        'text-primary': showActivitiesWithoutCard,
                        'opacity-50 cursor-not-allowed': loadingGetActivities,
                      }"
                      class="material-symbols-outlined cursor-pointer"
                      @click="changeActivitiesView('tag')"
                    >
                      view_module
                    </span>
                    <span
                      :class="{
                        'text-primary': !showActivitiesWithoutCard,
                        'opacity-50 cursor-not-allowed': loadingGetActivities,
                      }"
                      class="material-symbols-outlined cursor-pointer"
                      @click="changeActivitiesView('card')"
                    >
                      list
                    </span>
                  </div>
                </div>
                <b-tabs active-nav-item-class="font-weight-bold">
                  <b-tab active title="Todos" @click="filterGames(0)" />
                  <b-tab title="Utilizados" @click="filterGames(1)" />
                  <b-tab title="Não utilizados" @click="filterGames(2)" />
                </b-tabs>
                <LoadingInComponent
                  :id="2"
                  ref="loadingInActivitiesComponent"
                  :class="{ 'justify-content-center': showActivitiesWithoutCard }"
                  :is-background-transparent="activities.data.length > 0"
                  class="mt-6 selectedGames"
                >
                  <div
                    v-if="activities.data.length === 0 && !loadingGetActivities"
                    class="w-full color-patternTwo mt-8 mb-5"
                  >
                    <p class="text-center">
                      Não encontramos jogos com a combinação dos filtros.<br />
                      <br />
                      Experimente trocar o Ano Escolar e/ou
                      {{
                        $utilTeacherService.changeTextBySubject(
                          'knowledgeAxis',
                          'singularFirstCapitalLetters',
                        )
                      }}
                    </p>
                  </div>
                  <template v-else>
                    <div
                      v-for="(activity, indexActivity) in activities.data"
                      :key="indexActivity"
                      :class="{
                        'w-full lg:w-6/12 mb-base container-activityCard-customMission':
                          !showActivitiesWithoutCard,
                        'mb-3': showActivitiesWithoutCard,
                      }"
                      class="flex"
                    >
                      <div
                        v-if="showActivitiesWithoutCard"
                        :id="`${indexActivity}-id`"
                        class="gameIcons"
                      >
                        <img
                          :class="{
                            'bg-danger': activity.selected,
                            'opacity-50 cursor-not-allowed': fullActivities && !activity.selected,
                          }"
                          :name="indexActivity"
                          :src="activity.imageUrl"
                          alt="activity"
                          class="img-activity cursor-pointer"
                          @click="
                            activity.selected
                              ? removeSelectedActivity(activity)
                              : selectActivity(activity, indexActivity)
                          "
                        />
                        <b-tooltip
                          :target="`${indexActivity}-id`"
                          custom-class="tooltip-container"
                          placement="top"
                          variant="light"
                        >
                          <div class="text-left">
                            <p class="title-activity">
                              {{ activity.activityName }}
                            </p>
                            <p class="text-activity">
                              {{ activity.learningObjective }}
                            </p>
                            <span
                              class="text-patternOne cursor-pointer underline text-primary mx-0 my-0"
                              @click="
                                showActivityDetail(
                                  activity.activityId ? activity.activityId : activity.id,
                                )
                              "
                              >Ver detalhes</span
                            >
                            <br />
                          </div>
                        </b-tooltip>
                        <div v-if="activity.used" class="used-tag">
                          <b-badge variant="primary"> Utilizado</b-badge>
                        </div>
                      </div>
                      <div
                        v-else
                        :class="{
                          cardBorderedHover: activity.selected,
                          'opacity-50': fullActivities && !activity.selected,
                        }"
                        class="w-100 m-50 p-1 cardBordered"
                      >
                        <div class="m-0">
                          <div class="flex align-items-center">
                            <img :src="activity.imageUrl" alt="activity" class="img-activity" />
                            <div class="ml-1 col">
                              <p class="title-activity color-patternNine">
                                {{ activity.activityName }}
                              </p>
                              <p class="text-activity color-patternTwo">
                                {{ activity.learningObjective }}
                              </p>
                              <div class="flex flex-column">
                                <div class="columnAction-activity-customMission">
                                  <b-button
                                    v-if="!activity.selected"
                                    :class="{
                                      'cursor-not-allowed': fullActivities && !activity.selected,
                                    }"
                                    :disabled="fullActivities && !activity.selected"
                                    class="d-flex align-items-center buttonAction-activity"
                                    icon="add_circle_outline"
                                    style="border-radius: 24px"
                                    variant="primary"
                                    @click="selectActivity(activity, indexActivity)"
                                  >
                                    <span
                                      class="material-symbols-outlined mr-1"
                                      style="font-size: 16px"
                                    >
                                      add_circle
                                    </span>
                                    Adicionar
                                  </b-button>
                                  <b-button
                                    v-else
                                    :class="{
                                      'cursor-not-allowed': fullActivities && !activity.selected,
                                    }"
                                    class="d-flex align-items-center buttonAction-activity"
                                    icon="remove_circle_outline"
                                    style="border-radius: 24px"
                                    variant="danger"
                                    @click="removeSelectedActivity(activity)"
                                  >
                                    <span
                                      class="material-symbols-outlined mr-1"
                                      style="font-size: 16px"
                                    >
                                      do_not_disturb_on
                                    </span>
                                    Remover
                                  </b-button>
                                </div>
                                <div
                                  class="mt-1 columnAction-activity-customMission w-full text-lg-center"
                                >
                                  <span
                                    class="color-patternNine text-customMission text-primary"
                                    style="cursor: pointer"
                                    @click="showActivityDetail(activity.activityId)"
                                    >Ver detalhes</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </LoadingInComponent>
                <b-pagination
                  v-model="currentActivityPage"
                  :per-page="45"
                  :total-rows="activities.total"
                  class="pagination mt-1"
                  first-number
                  hide-goto-end-buttons
                  last-number
                />
              </b-card>
            </div>
            <div class="col-md-4 searchMenu">
              <b-form-group
                id="subject-group"
                class="filters-form-items"
                label="Turmas*"
                label-class="labelStyle"
              >
                <template v-slot:label>
                  <div>
                    <span class="labelStyle align-middle">Turmas* </span>
                    <span
                      id="info-tooltip"
                      v-b-tooltip.hover.right="
                        'É permitida a criação de até 40 missões ao mês por turma.'
                      "
                      class="material-symbols-outlined align-middle cursor-pointer"
                      style="font-size: 16px"
                    >
                      info
                    </span>
                  </div>
                </template>
                <ValidationProvider v-slot="{ errors }" name="Turmas" rules="required">
                  <ESelect
                    id="classe"
                    v-model="selectedClasses"
                    :options="classes"
                    :state="errors.length > 0 ? false : null"
                    :table-columns="[
                      {
                        key: 'className',
                        label: 'Turma',
                        searchable: true,
                      },
                    ]"
                    label="className"
                    multiple
                    :clearable="true"
                    :disabled="loadingGetClasses"
                    :loading="loadingGetClasses"
                    @input="controlSelectedClasses"
                  >
                    <template v-slot:option="item">
                      <div class="d-flex align-items-center gap-1">
                        <span :class="item.guidesCreated >= 40 ? 'text-muted' : ''">
                          {{ item.className }}
                        </span>
                        <b-badge variant="primary">{{ item.serieName }}</b-badge>
                        <span
                          v-if="
                            item.guidesCreated &&
                            item.guidesCreated < 40 &&
                            item.guidesCreated >= 25
                          "
                          id="info-tooltip"
                          v-b-tooltip.hover="
                            `${item.guidesCreated} de 40 missões criadas. As missões dessa turma estão se esgotando.`
                          "
                          class="material-symbols-outlined align-middle cursor-pointer"
                          style="font-size: 16px"
                        >
                          info
                        </span>
                        <span
                          v-if="item.guidesCreated && item.guidesCreated >= 40"
                          id="info-tooltip"
                          v-b-tooltip.hover="
                            `${item.guidesCreated} de 40 missões criadas. As missões dessa turma se esgotaram.`
                          "
                          class="material-symbols-outlined align-middle cursor-pointer text-danger"
                          style="font-size: 16px"
                        >
                          gpp_maybe
                        </span>
                      </div>
                    </template>
                  </ESelect>
                  <small v-for="(error, index) in errors" :key="index" class="text-danger">
                    {{ error }}
                  </small>
                </ValidationProvider>
              </b-form-group>
              <b-form-group
                v-if="canReadGroup"
                id="subject-group"
                class="filters-form-items"
                label="Grupos"
                label-class="labelStyle"
              >
                <ESelect
                  id="group"
                  :value="groupsList.find(g => g.id === selectedGroup) || null"
                  :disabled="disableSelectGroup"
                  :loading="loadingGetGroups"
                  :options="groupsList"
                  label="name"
                  placeholder="Selecione um grupo"
                  :clearable="true"
                  @input="val => (selectedGroup = val ? val.id : null)"
                >
                  <template #noOptions> Nenhum grupo foi encontrado</template>
                </ESelect>
              </b-form-group>

              <b-form-group
                id="classes-group"
                class="filters-form-items"
                label="Alunos*"
                label-class="labelStyle"
              >
                <MultiSelectCheckbox
                  :all-selected="
                    selectedClasses.length > 1 ||
                    selectedGroup ||
                    (formFinishInfo.students && formFinishInfo.students.length === 0)
                      ? true
                      : false
                  "
                  :markeds="
                    formFinishInfo.students && formFinishInfo.students.length === 0
                      ? markeds
                      : selectedStudents
                  "
                  :options="studentsCheckbox"
                  :show-all-select="true"
                  :show-dropdown="selectedClasses.length === 1 && !selectedGroup ? true : false"
                  label="studentName"
                  placeholder="Selecione os alunos"
                  value="studentId"
                  @setSelecteds="setSelectedStudents"
                />
              </b-form-group>
              <div class="flex justify-content-between flex-wrap">
                <b-form-group
                  id="startDate-group"
                  class="filters-form-items w-100"
                  label="Data de início*"
                  label-class="labelStyle"
                >
                  <b-form-datepicker
                    id="datepicker-dateformat1"
                    v-model="formFinishInfo.startDate"
                    :date-disabled-fn="disabledStartDays"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    }"
                    :hide-header="hideHeader"
                    :max="max1"
                    :min="min1"
                    calendar-width="100%"
                    label-help=""
                    locale="pt-br"
                    menu-class="w-100"
                    value-as-date
                    :state="dateFieldsOk()"
                    @input="changeStartDate()"
                  />
                </b-form-group>
                <b-form-group
                  id="endDate-group"
                  class="filters-form-items w-100"
                  label="Prazo final*"
                  label-class="labelStyle"
                >
                  <b-form-datepicker
                    id="datepicker-dateformat2"
                    v-model="formFinishInfo.endDate"
                    :date-disabled-fn="disabledEndedDays"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    }"
                    :hide-header="hideHeader"
                    :max="max2"
                    :min="min2"
                    calendar-width="100%"
                    label-help=""
                    locale="pt-br"
                    menu-class="w-100"
                    value-as-date
                    :state="dateFieldsOk()"
                    @input="changeFinishDate()"
                  />
                </b-form-group>
              </div>
              <b-form-group
                class="d-flex flex-row filters-form-items radio-group"
                label="Fluxo da missão"
                label-class="labelStyle"
              >
                <div class="w-100 d-flex flex-row justify-content-between">
                  <div class="d-flex align-items-center">
                    <b-form-radio
                      v-model="formFinishInfo.isSequential"
                      :value="false"
                      class="radio-inline"
                      name="isSequential"
                    >
                      Livre

                      <span
                        id="info-tooltip-livre"
                        class="material-symbols-outlined ml-50"
                        style="font-size: 16px"
                      >
                        info
                      </span>
                      <b-tooltip
                        custom-class="tooltip-container-fluxo"
                        placement="left"
                        target="info-tooltip-livre"
                      >
                        <div class="text-left">
                          <p>
                            Clique em 'Livre' para que o aluno possa escolher a sequência dos jogos
                            desta missão.
                          </p>
                          <img
                            class="mt-1 lg:inline-block w-full"
                            src="@/assets/images/teacher-context/school-context/institution-missions/custom-mission/free-mission.png"
                          />
                        </div>
                      </b-tooltip>
                    </b-form-radio>
                  </div>
                  <div class="d-flex align-items-center">
                    <b-form-radio
                      v-model="formFinishInfo.isSequential"
                      :value="true"
                      class="radio-inline"
                      name="isSequential"
                    >
                      Sequencial

                      <span
                        id="info-tooltip-sequencial"
                        class="material-symbols-outlined ml-50"
                        style="font-size: 16px"
                      >
                        info
                      </span>
                      <b-tooltip
                        custom-class="tooltip-container-fluxo"
                        placement="left"
                        target="info-tooltip-sequencial"
                      >
                        <div class="text-left">
                          <p>
                            Clique em 'Sequencial' para estipular a sequência em que os jogos
                            deverão ser jogados.
                          </p>
                          <img
                            class="mt-1 lg:inline-block w-full"
                            src="@/assets/images/teacher-context/school-context/institution-missions/custom-mission/sequential-mission.png"
                          />
                        </div>
                      </b-tooltip>
                    </b-form-radio>
                  </div>
                </div>
              </b-form-group>
              <b-form-group
                class="d-flex flex-row filters-form-items radio-group"
                label="Onde a missão deve ser realizada?"
                label-class="labelStyle"
              >
                <ValidationProvider
                  ref="applicationValidate"
                  v-slot="{ errors }"
                  name="onde a missão deve ser realizada"
                  rules="required"
                >
                  <div class="w-100 d-flex flex-row justify-content-between">
                    <b-form-radio-group v-model="formFinishInfo.application" class="d-flex">
                      <b-form-radio
                        v-for="(application, index) in applicationTypeEnum"
                        :key="index"
                        :value="index"
                        class="radio-inline"
                      >
                        <img :src="application.img" class="mr-1" />
                        {{ application.inputLabel }}
                        <span
                          :id="`info-tooltip-application${index}`"
                          class="material-symbols-outlined ml-50"
                          style="font-size: 16px"
                        >
                          info
                        </span>
                        <b-tooltip
                          :target="`info-tooltip-application${index}`"
                          custom-class="tooltip-container-fluxo"
                          placement="left"
                        >
                          {{ application.tooltip }}
                        </b-tooltip>
                      </b-form-radio>
                    </b-form-radio-group>
                  </div>

                  <small v-for="(error, index) in errors" :key="index" class="text-danger">
                    {{ error }}
                  </small>
                </ValidationProvider>
              </b-form-group>

              <b-form-group
                v-if="!$utilTeacherService.subjects.isMultiliteracy(subjectId)"
                class="d-flex flex-row filters-form-items radio-group"
                label="Ranking da missão para os alunos*"
                label-class="labelStyle"
              >
                <div class="w-100 d-flex flex-row justify-content-between">
                  <div class="d-flex align-items-center">
                    <b-form-radio
                      v-model="formFinishInfo.rankingEnabled"
                      :value="true"
                      name="show-ranking"
                    >
                      Habilitado
                    </b-form-radio>
                  </div>
                  <div class="d-flex align-items-center">
                    <b-form-radio
                      v-model="formFinishInfo.rankingEnabled"
                      :value="false"
                      name="show-ranking"
                    >
                      Desabilitado
                    </b-form-radio>
                  </div>
                </div>
              </b-form-group>
              <div v-if="!$utilTeacherService.subjects.isMultiliteracy(subjectId)" class="w-full">
                <b-form-group>
                  <template v-slot:label>
                    <div :class="{ 'text-muted': disableMessageGuide }">
                      <span class="labelStyle align-middle">Recado para o aluno </span>
                      <span
                        id="info-tooltip"
                        v-b-tooltip="
                          'Esta mensagem aparecerá antes que os alunos iniciem a missão.'
                        "
                        class="material-symbols-outlined align-middle cursor-help font-semibold"
                        style="font-size: 16px"
                      >
                        info
                      </span>
                    </div>
                  </template>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Recado para o aluno"
                    rules="max:600"
                  >
                    <b-form-textarea
                      id="studentMessage"
                      v-model="formFinishInfo.studentMessage"
                      :disabled="disableMessageGuide"
                      class="p-1 bg-white mb-50"
                      :placeholder="
                        disableMessageGuide
                          ? 'Está função está desabilitada para uma das turmas selecionadas.'
                          : 'Recado (Opcional)'
                      "
                      rows="5"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small v-for="(error, index) in errors" :key="index" class="text-danger">
                      {{ error }}
                    </small>
                  </ValidationProvider>
                  <div class="d-flex justify-content-between">
                    <b-link
                      :disabled="disableMessageGuide"
                      class="text-primary text-customMission labelStyle"
                      style="cursor: pointer"
                      @click="putTextSuggestion()"
                    >
                      Sugestão de texto
                    </b-link>
                    <span class="small text-secundary">
                      {{ formFinishInfo.studentMessage.length }}/600 caracteres
                    </span>
                  </div>
                </b-form-group>
              </div>
              <portal to="fixed-sticky-footer-destination">
                <div class="bg-white p-1 d-flex justify-content-center">
                  <b-button
                    v-if="showButton"
                    :disabled="loadingButton"
                    variant="primary"
                    @click="createOrSaveMission()"
                  >
                    <span class="align-middle">{{
                      $route.params.id ? 'Salvar missão ' : 'Criar missão '
                    }}</span>
                    <b-spinner v-show="loadingButton" small variant="white" />
                  </b-button>
                </div>
              </portal>
            </div>
          </div>
        </b-form>
      </ValidationObserver>
    </b-skeleton-wrapper>
    <b-modal
      ref="activityDetail"
      v-model="activePromptActivityDetail"
      header-class="bg-white"
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      scrollable
      size="xl"
      static
      @close="activePromptActivityDetail = false"
    >
      <template v-slot:modal-header>
        <button v-if="renderWebgl" class="back" @click="renderWebgl = false">
          <span class="material-symbols-outlined" style="font-size: 16px"> arrow_back </span>
        </button>
        <button class="close" @click="$refs.activityDetail.hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <ActivityDetail
        v-if="activePromptActivityDetail"
        v-model="renderWebgl"
        :activity-id="selectedActivityId"
        :educational-organization-id="params.educationalOrganizationIds"
        :subject-id="subjectId"
        @close-activityDetail="closeActivityDetail()"
      />
    </b-modal>
    <b-modal
      v-model="activePromptFeedbackCreateMission"
      centered
      hide-footer
      hide-header
      no-close-on-backdrop
      no-close-on-esc
      size="xl"
      static
      @close="closeFeedbackCreateMission()"
    >
      <FeedbackCreateMission
        v-if="activePromptFeedbackCreateMission"
        :id="createdGuideObjParam.id"
        @close-feedbackCreateMission="closeFeedbackCreateMission()"
        @close-feedbackCreateMissionWithAtt="closePromptActionAndRefreshList()"
      />
    </b-modal>
    <b-modal
      ref="refModalSuggestLoading"
      centered
      hide-footer
      hide-header
      no-close-on-esc
      no-no-close-on-backdrop
    >
      <div class="suggest-modal-content">
        <img
          class="mb-2"
          src="@/assets/images/teacher-context/new-mission/custom-mission/lightBulb.png"
        />
        <h1>Sugerindo missão para a sua turma...</h1>
      </div>
    </b-modal>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, onUnmounted, nextTick, toRefs, getCurrentInstance, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import { debounce } from 'lodash'
import store from '@/store'
import ability from '@/libs/acl/ability'
import CustomMissionFilters from './CustomMissionFilters.vue'
import ESelect from '@/components/selects/ESelect.vue'
import {
  applicationTypeEnum,
  mapMissiontypeEnum,
  studentMessageSuggestions,
} from '@/consts/missionsEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getStudentDataInguide } from '@/services/admin-context/students/Students.service'
import { getEducationalOrganizations } from '@/services/shared/educationalOrganization/EducationalOrganization.service'
import { getGroup, getGroups } from '@/services/shared/groups/Groups.service.js'
import { getMissionsById } from '@/services/shared/missions/Missions.Service'
import { getActivities } from '@/services/teacher-context/activities/Activities.service'
import { getDescriptors } from '@/services/teacher-context/descriptors/Descriptors.service'
import guideSuggest from '@/services/teacher-context/guideSuggest/guideSuggest'
import { createGuide, updateGuide } from '@/services/teacher-context/guides/Guides.Service'
import getKnowledgeaxes from '@/services/teacher-context/knowledgeaxes/Knowledgeaxes.service'
import getTags from '@/services/teacher-context/tags/Tags.service'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { heightFade } from '@core/directives/animations'
import { max, required } from '@core/utils/validations/validations.js'

const LoadingInComponent = defineAsyncComponent(() =>
  import('@/views/pages/teacher-context/shared/components/LoadingInComponent.vue'),
)
const MultiSelectCheckbox = defineAsyncComponent(() =>
  import('@/views/pages/teacher-context/shared/components/MultiSelectCheckbox.vue'),
)
const ActivityDetail = defineAsyncComponent(() =>
  import('@/views/pages/teacher-context/shared/modals/ActivityDetail.vue'),
)
const FeedbackCreateMission = defineAsyncComponent(() =>
  import('@/views/pages/teacher-context/shared/modals/FeedbackCreateMission.vue'),
)

const currentYear = new Date().getFullYear()

const { classe, subject } = useFilters()

const instance = getCurrentInstance()

const $bus = instance?.proxy?.$bus
const $router = instance?.proxy?.$router
const $store = instance?.proxy?.$store
const $route = instance?.proxy?.$route
const $toast = instance?.proxy?.$toast
const $utilTeacherService = instance?.proxy?.$utilTeacherService
const $http = instance?.proxy?.$http

const emit = defineEmits([])

// Refs for forms
const customMissionForm = ref(null)
const missionNameValidate = ref(null)
const applicationValidate = ref(null)
const loadingInActivitiesComponent = ref(null)
const loadingInSelectedActivitiesComponet = ref(null)
const refModalSuggestLoading = ref(null)
const activityDetail = ref(null)

// Data refs and reactive
const sugestButtonTooltipEnum = reactive({
  1: 'Antes de sugerir uma missão, selecione pelo menos um jogo como referência.',
  2: 'Ao clicar no botão, um conjunto de jogos será sugerido automaticamente com base nos jogos que você selecionou como referência.',
})
const renderWebgl = ref(false)
const hideHeader = ref(true)

const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

const minDate = new Date(today)
minDate.setYear(minDate.getFullYear())
minDate.setMonth(minDate.getMonth())
minDate.setDate(1)

const maxDate = new Date(today)
maxDate.setYear(maxDate.getFullYear())
maxDate.setMonth(maxDate.getMonth() + (12 - now.getMonth()))
maxDate.setDate(1)

const min1 = ref(minDate)
const max1 = ref(maxDate)
const min2 = ref(minDate)

const educationalOrganizationOptions = ref([{ name: 'Todos', id: 0 }])
const selectedFilterEducationalOrganization = ref({ name: 'Todos', id: 0 })
const knowledgeAxisOptions = ref([{ name: 'Todos', id: 0 }])
const selectedFilterKnowledgeAxis = ref({ name: 'Todos', id: 0 })
const descriptorOptions = ref([{ id: 0, name: 'Todas' }])
const selectedFilterDescriptor = ref({ id: 0, name: 'Todas' })
const tagOptions = ref({ id: 0, name: 'Todos' })
const selectedFilterTag = ref({
  id: 0,
  name: 'Pesquisar',
})
const loadingGetTags = ref(false)
const observerTag = ref(null)
const pageTag = ref(1)
const tagsBackup = ref([{ id: 0, name: 'Todos' }])
const gameName = ref('')
const searchTextTag = ref('')
const activities = ref({
  currentPage: 0,
  currentPageSize: 0,
  data: [],
  orderBy: [],
  pageSize: 0,
  total: 0,
  totalPages: 0,
})
const selectedTab = ref(0)
const selectedActivities = ref([])
const totalTimeSelectedActivities = ref(0)
const totalTimeSelectedActivitiesDoubled = ref(0)
const currentActivityPage = ref(1)
const totalActivitiesPerPage = ref(0)
const showActivitiesWithoutCard = ref(true)
const formFinishInfo = reactive({
  missionName: '',
  startDate: new Date(),
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  isSequential: false,
  rankingEnabled: false,
  annotations: '',
  studentMessage: '',
  messageVersionControl: 0,
  application: null,
  enabled: false,
})
const configDatePicker = reactive({
  lang: {
    days: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    months: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
  },
  disabledStartDate: {
    to: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    customPredictor(date) {
      return date.getFullYear() !== currentYear
    },
  },
  disabledFinishDate: {
    to: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    from: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    customPredictor(date) {
      return date.getFullYear() !== currentYear
    },
  },
})

const activePromptActivityDetail = ref(false)
const activePromptFeedbackCreateMission = ref(false)
const createdGuideObjParam = ref({})
const classes = ref([])
const groupsList = ref([])
const selectedClasses = ref([])
const selectedGroup = ref(null)
const selectedStudents = ref([])
const guideObjDetail = ref({})
const loadingButton = ref(false)
const selectedActivityId = ref(0)
const loadingGetClasses = ref(true)
const loadingGetGroups = ref(false)
const loadingGetActivities = ref(true)
const loadingGetEducationalOrganization = ref(true)
const loadingGetKnowledgeAxes = ref(false)
const loadingGetDescriptors = ref(false)
const markeds = ref([])
const studentsCheckbox = ref([])
const showButton = ref(true)
const onlyName = ref(false)
const showSearch = ref(false)
const suggestModal = ref(false)
const amountNotSuggested = ref(0)
const suggestMissionInstructionModal = ref(false)
const searchByGameName = ref(false)
const params = ref({})
const loading = ref(true)
const subjectsMaxActivities = reactive({
  1: 8,
  2: 8,
  3: 6,
  4: 8,
})

// Keep in sync with $store
const ACTION_ = ACTION
const PERMISSION_ = PERMISSION
const applicationTypeEnum_ = applicationTypeEnum

const subjectId = ref(undefined)
const globalClassId = ref(undefined)

try {
  subjectId.value = subject.value.id
  globalClassId.value = classe.value.ClassId
} catch (error) {
  $router.push({ name: 'newMissionsTeacher' })
}

if (!ability.can(ACTION.READ, PERMISSION.MODULE.SCHOOL_MISSIONS)) {
  $router.push({ name: 'home' })
}
if (
  $utilTeacherService.activityType.isCollective(typeQuery()) &&
  !$utilTeacherService.subjects.isMultiliteracy(subjectId.value)
) {
  $router.push({ name: 'newMissionsTeacher' })
}

// matchMedia listeners
const matchMediaActivities = window.matchMedia('(max-width:1200px)')
const matchMediaOctadesk = window.matchMedia('(max-width:991px)')

function typeQuery() {
  if ($route.params.id) {
    return mapMissiontypeEnum(formFinishInfo.type) || 0
  }
  return parseInt($route.params.type, 10)
}

// --- computed properties
function dateFieldsOk() {
  const parsedStartDate = new Date(formFinishInfo.startDate)
  const startUtc = Date.UTC(
    parsedStartDate.getUTCFullYear(),
    parsedStartDate.getUTCMonth(),
    parsedStartDate.getUTCDate(),
  )

  const now_ = new Date()
  const todayUtc = Date.UTC(now_.getUTCFullYear(), now_.getUTCMonth(), now_.getUTCDate())

  return todayUtc > startUtc ? false : null
}

const selectedActivitiesComputed = computed(() => selectedActivities.value)
const maxActivities = computed(() => subjectsMaxActivities[subjectId.value])
const fullActivities = computed(
  () => subjectsMaxActivities[subjectId.value] <= selectedActivities.value.length,
)
const totalQTDMissionsBySubject = computed(() => subjectsMaxActivities[subjectId.value])

const amount = computed(() => totalQTDMissionsBySubject.value - selectedActivities.value.length)

const amountSuggested = computed(() =>
  selectedActivities.value.filter(activity => activity.suggested).length,
)
const changeSuggestedMissions = computed(() =>
  selectedActivities.value.some(activity => activity.suggested),
)
const changeAllSuggestionController = computed(
  () => amountNotSuggested.value === 0 || amountSuggested.value === 0 || amount.value < 0,
)
const showMissionSuggestButton = computed(
  () => amount.value <= 0 || selectedActivities.value.length === 0,
)
const maximumSelectionReached = computed(
  () => !(selectedActivities.value.length === totalQTDMissionsBySubject.value),
)

const sugestButtonTooltip = computed(() => {
  if (selectedActivities.value.length > 0 && amountSuggested.value > 0) {
    return ''
  }
  if (!selectedActivities.value.length && !(amountSuggested.value > 0)) {
    return sugestButtonTooltipEnum[1]
  }
  return sugestButtonTooltipEnum[2]
})

const canReadGroup = computed(() =>
  ability.can(ACTION.READ, PERMISSION.GENERAL.BETA_FEATURES),
)

const disableSelectGroup = computed(
  () =>
    (selectedClasses.value && selectedClasses.value.length !== 1) || loadingGetClasses.value,
)

const studentsBySelectedClass = computed(() => {
  try {
    return selectedClasses.value
      .reduce((students, classeObj) => {
        const selectedClass = classes.value.find(cls => cls.classId === classeObj.classId)
        if (selectedClass) {
          const merged = [...students, ...selectedClass.students]
          return merged.filter(
            (student, index, self) =>
              self.findIndex(s => s.studentId === student.studentId) === index,
          )
        }
        return students
      }, [])
      .sort(sortByStudentName)
  } catch (error) {
    return []
  }
})

const max2 = computed(() => {
  const maxDate = new Date(formFinishInfo.startDate)
  maxDate.setYear(maxDate.getFullYear())
  maxDate.setMonth(maxDate.getMonth() + (12 - maxDate.getMonth()))
  maxDate.setDate(1)
  return maxDate
})

const disableMessageGuide = computed(() =>
  selectedClasses.value.some(cls => !cls.enableMessageGuide),
)

// --- methods

function disabledStartDays(ymd, date) {
  const dayStart = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  return day < dayStart.getDate() && month === dayStart.getMonth()
}
function disabledEndedDays(ymd, date) {
  const dayStart = new Date(formFinishInfo.startDate)
  const dateStart = dayStart.getTime()
  const dateEnd = date.getTime()
  const dateDifference = parseInt((dateEnd - dateStart) / (1000 * 3600 * 24), 10)
  return dateDifference > 30 || dateDifference < 0
}

function saveRecommendations(finalized) {
  const acceptedSuggestions = []

  selectedActivities.value.forEach(element => {
    if (element.suggested) {
      acceptedSuggestions.push(element.activityId)
    }
  })

  const payload = {
    accepted_recommendations: acceptedSuggestions,
    finalized,
  }

  guideSuggest.saveRecommendations(payload).then()
}

function seeMoreMissionSuggest() {
  window.open('https://educacross.link/estou-com-sorte', '_blank')
}

function openModalSuggesstLoading() {
  refModalSuggestLoading.value.show()
}
function closeModalSuggesstLoading() {
  refModalSuggestLoading.value.hide()
}

function resetPage() {
  selectedActivities.value = []
  guideSuggest.resetsuggestGuide()
}

function closeSuggestModal() {
  let featuresBeta = $store.getters.betaFeature

  if (!featuresBeta) {
    featuresBeta = {
      suggestGuideModal: true,
    }
    $store.commit('betaFeature', featuresBeta)
  }

  featuresBeta = {
    ...featuresBeta,
    suggestGuideModal: true,
  }

  $store.commit('betaFeature', featuresBeta)
}

function closePromptActionAndRefreshList() {
  activePromptFeedbackCreateMission.value = false

  $router.push({
    name: 'activeMissions',
  })
}

function createModalData(data) {
  const students = studentsBySelectedClass.value
  createdGuideObjParam.value.classe = classes.value.filter(classeItem =>
    data.classes.includes(classeItem.classId),
  )
  createdGuideObjParam.value.students = students.filter(student =>
    data.students.includes(student.studentId),
  )
  createdGuideObjParam.value.allStudents =
    createdGuideObjParam.value.students.length === students.length
}

function setSelectedStudents(selecteds) {
  selectedStudents.value = []
  selectedStudents.value = selecteds
}

function sortByName(first, second) {
  const firstString = first.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const secondString = second.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  if (firstString < secondString) {
    return -1
  }
  if (firstString > secondString) {
    return 1
  }
  return 0
}
function sortByClassName(first, second) {
  const firstString = first.className.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const secondString = second.className.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  if (firstString < secondString) {
    return -1
  }
  if (firstString > secondString) {
    return 1
  }
  return 0
}
function sortByStudentName(first, second) {
  const firstString = first.studentName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const secondString = second.studentName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  if (firstString < secondString) {
    return -1
  }
  if (firstString > secondString) {
    return 1
  }
  return 0
}

async function getMissionDetail(guideId, classId) {
  await getMissionsById(guideId, classId)
    .then(response => {
      guideObjDetail.value = response.data
    })
    .catch(error => {
      if (error.status === 403) $router.push({ name: 'home' })
      else {
        const { errors } = error.response.data
        const errorsArray = $utilTeacherService.handleFormatErrors(errors)
        errorsArray.forEach(elementError => {
          $toast({
            component: Toast,
            props: {
              title: 'Atenção',
              icon: 'AlertTriangleIcon',
              text: elementError,
              variant: 'danger',
            },
          })
        })
      }
    })
}
async function getClasses() {
  loadingGetClasses.value = true
  await getStudentDataInguide(subjectId.value)
    .then(response => {
      classes.value = response.data.map(item => ({
        ...item,
        disabled: item.guidesCreated >= 40,
      }))
      classes.value.sort(sortByClassName)
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = $utilTeacherService.handleFormatErrors(errors)
      errorsArray.forEach(elementError => {
        $toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
  loadingGetClasses.value = false
}
async function getGroupsOptions() {
  if (!canReadGroup.value) {
    return
  }
  loadingGetGroups.value = true
  await getGroups({ ClassId: selectedClasses.value[0].classId })
    .then(({ data }) => {
      groupsList.value = data
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = $utilTeacherService.handleFormatErrors(errors)
      errorsArray.forEach(elementError => {
        $toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
  loadingGetGroups.value = false
}
async function getActivitiesFn(paramsObj) {
  loadingGetActivities.value = true
  try {
    loadingInActivitiesComponent.value.finishLoading()
    loadingInActivitiesComponent.value.startLoading()
  } catch (e) {}
  const subjectAux = subjectId.value
  const dataFilters = {}

  if (gameName.value) {
    dataFilters.Search = gameName.value
  }

  if (selectedFilterEducationalOrganization.value.id) {
    dataFilters.educationalOrganizationIds = selectedFilterEducationalOrganization.value.id
  }

  if (selectedFilterKnowledgeAxis.value.id) {
    dataFilters.knowledgeAxisIds = selectedFilterKnowledgeAxis.value.id
  }

  if (selectedFilterDescriptor.value.id) {
    dataFilters.descriptorIds = selectedFilterDescriptor.value.id
  }

  if (selectedFilterTag.value.tagId) {
    dataFilters.tagIds = selectedFilterTag.value.tagId
  } else if (selectedFilterTag.value.activityNumber) {
    dataFilters.activityNumbers = selectedFilterTag.value.activityNumber
  }

  let used = null
  if (selectedTab.value === 1) {
    used = true
  } else if (selectedTab.value === 2) {
    used = 'false'
  }

  await getActivities({
    page: currentActivityPage.value,
    pageSize: showActivitiesWithoutCard.value ? 45 : 10,
    subjectIds: subjectId.value,
    used,
    ...paramsObj,
  })
    .then(response => {
      if (subjectAux === subjectId.value) {
        activities.value = response.data
      }
      findSelectedActivities()
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = $utilTeacherService.handleFormatErrors(errors)
      errorsArray.forEach(elementError => {
        $toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
  loadingGetActivities.value = false
  try {
    loadingInActivitiesComponent.value.finishLoading()
  } catch (e) {}
}

async function getEducationalOrganizationsFn() {
  loadingGetEducationalOrganization.value = true
  await getEducationalOrganizations(subjectId.value)
    .then(response => {
      educationalOrganizationOptions.value = response.data
      educationalOrganizationOptions.value.sort(sortByName)
      educationalOrganizationOptions.value.unshift({ name: 'Todos', id: 0 })
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = $utilTeacherService.handleFormatErrors(errors)
      errorsArray.forEach(elementError => {
        $toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
  loadingGetEducationalOrganization.value = false
}
async function getKnowledgeAxesFn() {
  loadingGetKnowledgeAxes.value = true
  await getKnowledgeaxes(selectedFilterEducationalOrganization.value.id)
    .then(response => {
      knowledgeAxisOptions.value = response.data
      knowledgeAxisOptions.value.sort(sortByName)
      knowledgeAxisOptions.value.unshift({ name: 'Todos', id: 0 })
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = $utilTeacherService.handleFormatErrors(errors)
      errorsArray.forEach(elementError => {
        $toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
  loadingGetKnowledgeAxes.value = false
}
async function getDescriptorsFn() {
  loadingGetDescriptors.value = true
  await getDescriptors(selectedFilterKnowledgeAxis.value.id)
    .then(response => {
      descriptorOptions.value = response.data
      descriptorOptions.value.sort(sortByName)
      descriptorOptions.value.unshift({ id: 0, name: 'Todas' })
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = $utilTeacherService.handleFormatErrors(errors)
      errorsArray.forEach(elementError => {
        $toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
  loadingGetDescriptors.value = false
}
async function getTagsFn(textSearch) {
  if (searchTextTag.value) {
    const type = typeQuery()
    await getTags({
      subjectId: subjectId.value,
      searchTerm: textSearch,
      page: pageTag.value,
      type: type || '1',
      onlyname: onlyName.value,
    })
      .then(({ data }) => {
        tagOptions.value = data
      })
      .catch(error => {
        const { errors } = error.response.data
        const errorsArray = $utilTeacherService.handleFormatErrors(errors)
        errorsArray.forEach(elementError => {
          $toast({
            component: Toast,
            props: {
              title: 'Atenção',
              icon: 'AlertTriangleIcon',
              text: elementError,
              variant: 'danger',
            },
          })
        })
      })
  }
}
const getActivitiesByGameName = debounce(async function () {
  getActivitiesFn()
  currentActivityPage.value = 1
}, 600)
const getTagsDebounce = debounce(async function (textSearch) {
  pageTag.value = 1
  await getTagsFn(textSearch)
  loadingGetTags.value = false
  if (searchTextTag.value) {
    await nextTick()
    observerTag.value.observe(instance.refs.loadTagOptions)
  }
}, 600)
function onOpenTags() {
  if (selectedFilterTag.value.name === 'Todos') {
    tagOptions.value.data = []
    tagsBackup.value.splice(1, tagsBackup.value.length - 1)
  } else searchTextTag.value = selectedFilterTag.value.name
}
function onCloseTags() {
  observerTag.value.disconnect()
  pageTag.value = 1
}
async function infiniteScrollTags([{ isIntersecting, target }]) {
  if (isIntersecting) {
    const ul = target.offsetParent
    const { scrollTop } = target.offsetParent
    pageTag.value += 1
    await getTagsFn(searchTextTag.value)
    await nextTick()
    ul.scrollTop = scrollTop
  }
}
async function changeActivitiesFilter() {
  if (!loadingGetActivities.value) {
    await getActivitiesFn(params.value)
    findSelectedActivities()
  }
}
async function changeEducationalOrganization() {
  selectedFilterKnowledgeAxis.value = knowledgeAxisOptions.value[0]
  descriptorOptions.value = [{ id: 0, name: 'Todas' }]
  selectedFilterDescriptor.value = descriptorOptions.value[0]
  resetCurrentActivityPage()
  await getKnowledgeAxesFn()
  changeActivitiesFilter()
}
async function changeKnowledgeAxis() {
  selectedFilterDescriptor.value = descriptorOptions.value[0]
  resetCurrentActivityPage()
  await getDescriptorsFn()
  changeActivitiesFilter()
}
function changeActivitiesView(param) {
  if (!loadingGetActivities.value) {
    resetCurrentActivityPage()
    if (param === 'tag') {
      if (!showActivitiesWithoutCard.value) {
        showActivitiesWithoutCard.value = true
        changeActivitiesFilter()
      }
    } else if (param === 'card') {
      if (showActivitiesWithoutCard.value) {
        showActivitiesWithoutCard.value = false
        changeActivitiesFilter()
      }
    }
  }
}
async function createOrSaveMission() {
  if (dateFieldsOk() === false) {
    $toast({
      component: Toast,
      props: {
        title: 'Atenção! As datas expiraram.',
        icon: 'AlertOctagonIcon',
        text: 'Defina um período válido para a missão.',
        variant: 'danger',
      },
    })
    return
  }
  await customMissionForm.value.validate().then(async response => {
    if (response) {
      if (selectedActivities.value.length === 0) {
        $toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: 'É obrigatória a seleção de pelo menos um jogo',
            variant: 'danger',
          },
        })
        return
      }
      if (selectedActivities.value.length > maxActivities.value) {
        $toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: 'Você ultrapassou o limite máximo de jogos por missão.',
            variant: 'danger',
          },
        })
        return
      }
      if (selectedStudents.value.length === 0) {
        $toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: 'A(s) turma(s) selecionada(s) não tem alunos adicionados',
            variant: 'danger',
          },
        })
        return
      }
      loadingButton.value = true
      const activitiesIds = []

      selectedActivities.value.forEach(element => {
        activitiesIds.push(element.activityId)
      })

      const formData = {
        name: formFinishInfo.missionName,
        start: new Date(
          formFinishInfo.startDate.getFullYear(),
          formFinishInfo.startDate.getMonth(),
          formFinishInfo.startDate.getDate(),
        ),
        expiration: new Date(
          formFinishInfo.endDate.getFullYear(),
          formFinishInfo.endDate.getMonth(),
          formFinishInfo.endDate.getDate(),
        ),
        sequential: formFinishInfo.isSequential,
        rankingEnabled: !$utilTeacherService.subjects.isMultiliteracy(subjectId.value)
          ? formFinishInfo.rankingEnabled
          : false,
        messageToStudent: formFinishInfo.studentMessage,
        annotation: formFinishInfo.annotations,
        students: selectedStudents.value,
        classes: selectedClasses.value.map(cls => cls.classId),
        activities: activitiesIds,
        classGroupId: selectedGroup.value,
        application: formFinishInfo.application,
      }

      if ($route.params.id) {
        await updateGuide($route.params.id, formData)
          .then(() => {
            saveRecommendations(true)
            $toast({
              component: Toast,
              props: {
                title: 'Atenção',
                icon: 'CheckCircleIcon',
                text: 'Missão salva com sucesso!',
                variant: 'success',
              },
            })

            loadingButton.value = false
            $bus.emit(
              'chooseInstitutionMissionByTeacherNavigation',
              formData.classes[0],
            )

            createdGuideObjParam.value = {
              id: Number($route.params.id),
              name: formData.name,
              start: formData.start,
              expiration: formData.expiration,
              guideType: 'customMission',
              rankingEnabled: formData.rankingEnabled,
            }

            showButton.value = false

            $bus.emit('showConfirmExit', false)
            if (guideObjDetail.value.enabled) {
              closeFeedbackCreateMission()
            } else {
              activePromptFeedbackCreateMission.value = true
            }
          })
          .catch(error => {
            const { message, errors } = error.response.data

            if (errors) {
              Object.values(errors).forEach(err => {
                err.forEach(msg => {
                  $toast({
                    component: Toast,
                    props: {
                      title: 'Atenção',
                      icon: 'AlertTriangleIcon',
                      text: msg,
                      variant: 'danger',
                    },
                  })
                })
              })
            } else {
              $toast({
                component: Toast,
                props: {
                  title: 'Atenção',
                  icon: 'AlertTriangleIcon',
                  text: message,
                  variant: 'danger',
                },
              })
            }

            loadingButton.value = false
          })
          .finally(() => {
            loadingButton.value = false
          })
      } else {
        loadingButton.value = true
        formData.subject = subjectId.value
        formData.type = $utilTeacherService.activityType.getNumberByType(typeQuery())

        await createGuide(formData)
          .then(res => {
            createdGuideObjParam.value = {
              id: res.data.id,
              name: formData.name,
              start: formData.start,
              expiration: formData.expiration,
              guideType: 'customMission',
              rankingEnabled: formData.rankingEnabled,
            }

            createModalData(formData)

            $bus.emit('showConfirmExit', false)
            activePromptFeedbackCreateMission.value = true
            loadingButton.value = false
            $bus.emit(
              'chooseInstitutionMissionByTeacherNavigation',
              formData.classes[0],
            )

            showButton.value = false
          })
          .catch(e => {
            const { message } = e.response.data
            $toast({
              component: Toast,
              props: {
                title: 'Atenção',
                icon: 'AlertTriangleIcon',
                text: message,
                variant: 'danger',
              },
            })
            loadingButton.value = false
          })
          .finally(() => {
            loadingButton.value = false
          })
      }
    } else {
      if (formFinishInfo.missionName.length === 0) {
        $toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: 'O campo nome da missão é obrigatório',
            variant: 'danger',
          },
        })
        return
      }
      if (formFinishInfo.missionName.length > 50) {
        $toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: 'O campo nome da missão não deve ter mais que 50 caracteres',
            variant: 'danger',
          },
        })
      }
    }
  })
}
function changeStartDate() {
  const dayStart = new Date(formFinishInfo.startDate)
  const dayEnd = new Date(formFinishInfo.endDate)

  if (dayStart > dayEnd) {
    formFinishInfo.endDate = new Date(
      Date.parse(formFinishInfo.startDate) + 7 * 24 * 60 * 60 * 1000,
    )
  }

  if (dayStart.getFullYear() !== dayEnd.getFullYear()) {
    formFinishInfo.endDate = new Date(Date.parse(formFinishInfo.startDate))
  }

  configDatePicker.disabledFinishDate.from = new Date(
    Date.parse(formFinishInfo.startDate) + 30 * 24 * 60 * 60 * 1000,
  )
}
function changeFinishDate() {
  if (formFinishInfo.endDate < formFinishInfo.startDate) {
    formFinishInfo.startDate = formFinishInfo.endDate
  }
  configDatePicker.disabledFinishDate.from = new Date(
    Date.parse(formFinishInfo.startDate) + 30 * 24 * 60 * 60 * 1000,
  )
}

function selectActivity(activity, index) {
  if (selectedActivities.value.length >= maxActivities.value) {
    return
  }
  activity.selected = true
  activities.value.data.splice(index, 1, activity)
  selectedActivities.value.push(activity)
  calcTotalTimeSelectedActivities(activity.time, true)
}
function removeSelectedActivity(activity) {
  // Note: Vuex store is not using namespaced module, using global commit
  store.commit('UPDATE_SUGGEST_GUIDE_ACTIVITIES_REMOVED', activity.activityId)

  const index = activities.value.data.findIndex(ac => ac.activityId === activity.activityId)
  if (index !== -1) {
    activity.selected = false
    activities.value.data.splice(index, 1, activity)
  }
  // Remove from selected
  selectedActivities.value = selectedActivities.value.filter(
    ac => ac.activityId !== activity.activityId,
  )
  calcTotalTimeSelectedActivities(activity.time, false)
}
function calcTotalTimeSelectedActivities(time, isSum) {
  if (isSum) {
    totalTimeSelectedActivities.value += time
  } else {
    totalTimeSelectedActivities.value -= time
  }
  totalTimeSelectedActivitiesDoubled.value = totalTimeSelectedActivities.value * 2
}
function showActivityDetail(id) {
  selectedActivityId.value = id
  activePromptActivityDetail.value = true
}
function controlSelectedClasses() {
  selectedStudents.value = []
}
function controlQtdSelectedStudents() {
  classes.value.forEach(element => {
    if (element.classId === selectedClasses.value[0].classId)
      if (element.students.length === selectedStudents.value.length)
        selectedStudents.value = []
  })
}
function openStartDateMission() {
  instance.refs.startDateMission.$children[0].input.click()
  instance.refs.startDateMission.$children[0].input.focus()
}
function openEndDateMission() {
  instance.refs.endDateMission.$children[0].input.click()
  instance.refs.endDateMission.$children[0].input.focus()
}
function closeFeedbackCreateMission() {
  activePromptFeedbackCreateMission.value = false
  $router.push({
    name: 'activeMissions',
  })
}
function putTextSuggestion() {
  if (studentMessageSuggestions.length > formFinishInfo.messageVersionControl)
    formFinishInfo.messageVersionControl += 1
  else {
    formFinishInfo.messageVersionControl = 1
  }

  studentMessageSuggestions.forEach(element => {
    if (formFinishInfo.messageVersionControl === element.id) {
      formFinishInfo.studentMessage = element.text
    }
  })
}
function findAndSelectClassByGlobalClassId() {
  classes.value.forEach(element => {
    if (element.classId === globalClassId.value) {
      selectedClasses.value.push(element)
      getGroupsOptions()
    }
  })
}
async function findEducationalOrganizationBySerieIdAndFilter() {
  if ($utilTeacherService.subjects.isMath(subjectId.value)) {
    educationalOrganizationOptions.value.forEach(async element => {
      if (element.name.includes($store.getters['filters/class']?.SerieId)) {
        selectedFilterEducationalOrganization.value = element
        await changeEducationalOrganization()
      }
    })
  }
}
function findSelectedActivities() {
  selectedActivities.value.forEach(element => {
    const findedActivityIndex = activities.value.data.findIndex(
      el => el.activityId === element.activityId,
    )
    if (findedActivityIndex !== -1) {
      activities.value.data[findedActivityIndex].selected = true
      activities.value.data.splice(
        findedActivityIndex,
        1,
        activities.value.data[findedActivityIndex],
      )
    }
  })
}
function resetCurrentActivityPage() {
  currentActivityPage.value = 1
}
function suggestMission() {
  openModalSuggesstLoading()

  const selectedMissions = selectedActivities.value.map(activity => activity.activityId)

  const payload = {
    activities_id: selectedMissions,
    discipline: subjectId.value,
    amount: amount.value,
  }

  guideSuggest
    .getRecommendations(payload)
    .then(response => {
      this.suggestedMissionsIds = response.recommendations
      getSuggestedMissions(this.suggestedMissionsIds)
    })
    .catch(() => {
      $toast.error({
        component: Toast,
        props: {
          title: 'Atenção',
          text: 'Ocorreu um erro inesperado. Contate o suporte.',
          variant: 'danger',
          icon: 'AlertTriangleIcon',
        },
      })
    })
    .finally(() => {
      closeModalSuggesstLoading()
    })
}
function getSuggestedMissions(suggestedMissionsIds) {
  $http
    .get(`v2/activities?${suggestedMissionsIds.map(id => `Ids=${id}`).join('&')}`)
    .then(response => {
      if (response.status === 200) {
        response.data.data = response.data.data.map(activity => {
          activity.suggested = true
          activity.selected = true
          return activity
        })
        response.data.data.forEach(element => {
          selectActivity(element)
        })
      }
    })
    .finally(() => {
      closeModalSuggesstLoading()
    })
}
async function changeSuggest() {
  selectedActivities.value.forEach(element => {
    if (element.suggested) {
      removeSelectedActivity(element)
    }
  })
  suggestMission()
}
function filterGames(tabNumber) {
  switch (tabNumber) {
    case 1:
      selectedTab.value = 1
      break
    case 2:
      selectedTab.value = 2
      break
    default:
      selectedTab.value = 0
      break
  }
  getActivitiesFn(params.value)
}
function changeActivitiesViewHandler(event) {
  if (event.matches) {
    changeActivitiesView('card')
  } else {
    changeActivitiesView('tag')
  }
}

function closeActivityDetail() {
  activePromptActivityDetail.value = false
}

// --- Watchers

watch(() => disableMessageGuide.value, value => {
  if (value) {
    formFinishInfo.studentMessage = ''
  }
})

watch(() => selectedActivities.value, () => {
  amountNotSuggested.value = 0
  selectedActivities.value.forEach(element => {
    if (!element.suggested) {
      amountNotSuggested.value += 1
    }
  })
})

watch(() => selectedClasses.value, () => {
  studentsCheckbox.value = studentsBySelectedClass.value
  selectedGroup.value = null
  groupsList.value = []
  if (selectedClasses.value && selectedClasses.value.length === 1) {
    getGroupsOptions()
  }
  if ($route.params.id) {
    if (formFinishInfo.students && formFinishInfo.students.length === 0) {
      selectedStudents.value = studentsBySelectedClass.value
    } else {
      selectedStudents.value = formFinishInfo.students
    }
  }
})

watch(selectedGroup, () => {
  if (selectedGroup.value) {
    getGroup(selectedGroup.value).then(({ data }) => {
      studentsCheckbox.value = data.students.map(item => {
        return { studentId: item.id, studentName: item.name }
      })
    })
  } else {
    studentsCheckbox.value = studentsBySelectedClass.value
  }
})

watch(currentActivityPage, () => {
  changeActivitiesFilter()
})

watch(searchTextTag, () => {
  if (searchTextTag.value) {
    tagOptions.value.data = []
    tagsBackup.value.splice(1, tagsBackup.value.length - 1)
    loadingGetTags.value = true
    getTagsDebounce(searchTextTag.value)
  }
})

watch(params, () => {
  if (!loadingGetEducationalOrganization.value) {
    currentActivityPage.value = 1
    getActivitiesFn(params.value)
  }
})

// --- Lifecycle hooks

onMounted(async () => {
  $bus.emit('showConfirmExit', true)

  if (window.innerWidth <= 1200) showActivitiesWithoutCard.value = false

  matchMediaActivities.addEventListener('change', changeActivitiesViewHandler)

  observerTag.value = new IntersectionObserver(infiniteScrollTags)

  try {
    loadingInActivitiesComponent.value.startLoading()
  } catch (e) {}
  if ($route.params.id) {
    try {
      loadingInSelectedActivitiesComponet.value.startLoading()
    } catch (e) {}
  }

  if ($route.params.id) {
    await getMissionDetail($route.params.id, globalClassId.value)
    Object.assign(formFinishInfo, {
      missionName: guideObjDetail.value.name,
      startDate: guideObjDetail.value.start ? new Date(guideObjDetail.value.start) : new Date(),
      endDate: guideObjDetail.value.expiration
        ? new Date(guideObjDetail.value.expiration)
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      isSequential: guideObjDetail.value.sequential,
      rankingEnabled: guideObjDetail.value.rankingEnabled,
      annotations: guideObjDetail.value.annotation,
      studentMessage: guideObjDetail.value.messageToStudent || '',
      messageVersionControl: 0,
      students: guideObjDetail.value.students,
      classes: guideObjDetail.value.classes,
      application: guideObjDetail.value.application ? guideObjDetail.value.application : 1,
      type: guideObjDetail.value.type,
      enabled: guideObjDetail.value.enabled,
    })
    changeStartDate()
  } else {
    formFinishInfo.application = 1
  }

  loading.value = false
  await getClasses()
  if ($route.params.id) {
    if (guideObjDetail.value.students && guideObjDetail.value.students.length !== 0) {
      nextTick(() => {
        findAndSelectClassByGlobalClassId()
        setTimeout(() => {
          selectedGroup.value = guideObjDetail.value.classGroupId
          selectedStudents.value = guideObjDetail.value.students
        }, 1)
      })
    } else {
      selectedClasses.value = classes.value.filter(classItem =>
        guideObjDetail.value.classes.includes(classItem.classId),
      )

      markeds.value = studentsBySelectedClass.value.filter(student => student.studentId)
    }
  } else {
    nextTick(() => {
      findAndSelectClassByGlobalClassId()
    })
  }

  await getEducationalOrganizationsFn()

  await getActivitiesFn(params.value)

  await findEducationalOrganizationBySerieIdAndFilter()

  if ($route.params.id) {
    selectedActivities.value = [...guideObjDetail.value.activities]
    selectedActivities.value.forEach(el => {
      calcTotalTimeSelectedActivities(el.time, true)
    })
    findSelectedActivities()
    try {
      loadingInSelectedActivitiesComponet.value.finishLoading()
    } catch (e) {}
  }
})

onBeforeUnmount(() => {
  saveRecommendations(false)
})

onUnmounted(() => {
  matchMediaActivities.removeEventListener('change', changeActivitiesViewHandler)
})

// Filters for formattedTime
const formattedTime = value => {
  if (!value || isNaN(value)) return '0m'
  const hours = Math.floor(value / 60)
  const minutes = value % 60
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}

</script>

<script>
// For global filters used in template
export default {
  filters: {
    formattedTime(value) {
      if (!value || isNaN(value)) return '0m'
      const hours = Math.floor(value / 60)
      const minutes = value % 60
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    },
  },
}
</script>

<style lang="scss">
  .suggest-modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: fit-content;

    padding: 1rem;

    h1 {
      font-size: 1.5rem;
      text-align: center;
    }

    .title {
      color: #5e5873;
      font-size: 1.5rem;
      line-height: 1.8125rem;

      margin-top: 1rem;
    }

    .subtitle {
      color: #6e6b7b;
      font-size: 1rem;
      text-align: center;

      margin-top: 1rem;
    }

    .instruction {
      color: #6e6b7b;
      font-size: 1rem;
      font-weight: 600;
      text-align: center;

      margin-top: 1.5rem;

      .steps {
        color: #7367f0;
      }
    }

    .step-img {
      border-radius: 40px;
      margin-top: 1rem;
    }

    .footer-buttons {
      margin-top: 1rem;

      button {
        width: 12.5rem;
      }

      .btn-closeSuggest {
        margin-left: 1rem;
      }
    }
  }

  #customMission {
    .custom-control-input:checked ~ .custom-control-label::before {
      border-color: #7367f0;
      background-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%237367f0'/%3e%3c/svg%3e");
      background-size: cover;
    }

    .labelStyle {
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
    }

    [dir] .nav-tabs .nav-link {
      font-size: 15px;
      font-weight: 600;
      line-height: 24px;
    }

    [dir='ltr'] .nav-tabs .nav-link:after {
      background: #7367f0 !important;
    }

    [dir] .nav-tabs .nav-link.active {
      font-size: 15px !important;
      font-weight: 600 !important;
      line-height: 24px !important;
    }

    .textarea {
      border-radius: 10px;
      margin: 0.5rem 0 0.5rem 0;
    }

    .radio-group div {
      width: 100%;
    }

    .radio-group label {
      margin: 0;
    }

    .radio-inline label {
      display: flex;
      align-items: center;
    }

    .label-checkbox {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;

      color: #7367f0;
    }

    .label-filter {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
    }

    .boxIconDate-customMission {
      @media (min-width: 1200px) {
        .vdp-datepicker {
          direction: rtl;
        }
        input,
        .vdp-datepicker__calendar {
          direction: ltr;
        }
      }
    }

    .suggest-mission-container {
      display: flex;
      justify-content: flex-end;

      .suggest-mission {
        background: #ff922a;
      }

      .change-suggest {
        // background: rgba($color: #ff922a, $alpha: 0.03);
        color: #ff922a;
        margin-left: 1.5rem;

        border: 1px solid #ff922a;
      }

      .suggest-mission-text {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .suggestedItem {
      .img-activity {
        background: #ff9e43;
      }
    }

    .mission-suggest-tip {
      display: flex;
      align-items: center;
      flex-direction: row;

      padding: 12px 16px;

      background: rgba(115, 103, 240, 0.12);
      border-radius: 10px;

      color: #7367f0;
      font-weight: 700;
      font-size: 12px;

      margin-bottom: 16px;
    }

    .btn-full-width {
      min-width: fit-content;
    }
  }
</style>
<style lang="scss" scoped>
  .tooltip-container {
    &::v-deep .tooltip-inner {
      max-width: 600px !important;
      width: 600px !important;
      padding: 1rem;
    }
  }

  .tooltip-container-fluxo::v-deep .tooltip-inner {
    max-width: 500px !important;
    width: 400px !important;
    padding: 1rem;
  }

  .selectedGames {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: flex-start;

    .details-container {
      padding: 0 10px;
      font-size: 0.8rem;
    }
  }

  .gameIcons {
    position: relative;
    margin: 0.5rem;

    .used-tag {
      position: absolute;
      top: 45%;
      right: 0;

      .badge {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  .activity-container {
    border: 1px solid rgba($color: #1e1e1e, $alpha: 0.2);
    background: rgba($color: #7367f0, $alpha: 0.2);
    border-radius: 16px;
    position: relative;

    .activity-image {
      margin: 8px 6px 0;
    }

    .remove-activity-icon {
      position: absolute;
      margin-top: -18px;
      margin-left: 16px;
    }

    .details-container {
      margin: 12px 0;
    }
  }

  .title-customMission {
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;
  }

  .subtitle-customMission {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
  }

  .text-customMission {
    font-size: 16px;
    line-height: 18px;
    font-weight: normal;
  }

  .info-icon {
    width: 16px;
    height: 16px;
  }

  .text-link {
    text-decoration: underline;
    cursor: pointer;
  }

  .back-linkText {
    top: -4.15rem;
  }

  .card-selectedActivities {
    min-height: 12rem;
  }

  .title-activity {
    font-weight: 600;
    font-size: 1rem;
    line-height: 24px;
  }

  .text-activity {
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 24px;
  }

  .img-activity {
    width: 100px;
    height: 100px;
  }

  .img-profile {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    padding: 8px;
  }

  .icon-deleteActivity {
    background: #1c183a;
    opacity: 0.6;
    color: white;
    font-weight: bold;
    border-radius: 50%;
    font-size: 20px;
    position: relative;
    top: 0.9rem;
    left: 6.1rem;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }

  .icon-deleteActivity:hover {
    @media (min-width: 1025px) {
      top: 1.1rem;
      left: 5.9rem;
      box-shadow: none;
      transition: all 0.2s ease;
    }
  }

  .bgcolor-patternTen,
  .bg-danger {
    transition: all 0.8s ease;
  }

  .cardBordered {
    border: 1px solid #e2e2e3;
    border-radius: 10px;
  }

  .cardBorderedHover {
    background-color: rgba(115, 103, 240, 0.12);
  }

  .iconsContainer-chooseHowShowActivity {
    display: flex;
    align-items: center;

    padding: 8px;

    border: 1px solid #e2e2e3;
    border-radius: 6px;

    @media (max-width: 991px) {
      margin-top: 1.5rem;
    }
  }

  .iconDate-customMission {
    position: relative;
    top: 0.45rem;
    right: 2.2rem;
    font-size: 22px;
    cursor: pointer;
    width: 0;
  }

  .filters {
    flex-flow: row wrap;
  }

  .checkboxFilter {
    margin-left: 8px;
    @media (max-width: 991px) {
      margin: 8px 0 0 0;
    }
  }

  .w-47 {
    width: 47%;

    @media (max-width: 991px) {
      width: 100%;
    }
  }

  .w-63 {
    width: 63%;

    @media (max-width: 991px) {
      width: 100%;
    }
  }

  .container-customMission {
    flex-flow: row wrap-reverse;
    margin-bottom: 1rem !important;

    .searchMenu {
      padding-left: 1.5rem;
      @media (max-width: 991px) {
        padding: 0;
        width: 100%;
      }
    }
  }

  .filters-form-items {
    @media (max-width: 991px) {
      width: 100%;
    }
  }

  .container-activityCard-customMission {
    .columnAction-activity-customMission {
      .buttonAction-activity {
        padding: 0.55rem 1.6rem !important;
        border-radius: 20px;
      }

      @media (max-width: 1600px) and (min-width: 1401px) {
        width: 100% !important;
        .buttonAction-activity {
          margin-bottom: 0.75rem;
        }
      }
      @media (max-width: 767px) and (min-width: 350px) {
        width: 50% !important;
      }
      @media (max-width: 349px) {
        .buttonAction-activity {
          margin-bottom: 0.75rem;
        }
      }
    }
  }

  .box-wizardButton {
    @media (max-width: 991px) {
      position: fixed !important;
      float: right;
      bottom: 0;
      right: 0;
      padding: 2rem 2rem 1.5rem 2.3rem;
      background: #fff;
    }
    @media (max-width: 576px) {
      padding: 2rem 1rem 1.5rem 1.35rem;
    }
  }
</style>