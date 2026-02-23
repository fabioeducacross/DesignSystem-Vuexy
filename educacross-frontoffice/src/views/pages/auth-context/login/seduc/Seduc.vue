<template>
  <AuthLayout>
    <template v-slot:image>
      <b-img src="@/assets/images/pages/login/LogoLogin.svg" class="mx-auto mb-3" />
      <h1 class="text-center color-grayTheme">Acesso Unificado para Educação.</h1>
      <p class="text-center">Entre com sua Conta.</p>
    </template>
    <section>
      <!-- <h1>Acesso Unificado para Educação: Entre com sua Conta</h1> -->
      <p class="text-center"><b-img src="@/assets/images/logo/logo-secretaria-edu.png" /></p>

      <p class="text-justify mb-4">
        Bem-vindo à Educacross, o ponto central para sua jornada de aprendizagem. Se você é aluno,
        educador ou administrador de uma das escolas parceiras, por favor, acesse utilizando sua
        conta do Google ou Microsoft. Sua chave para um mundo de conhecimento e colaboração está a
        apenas um clique de distância.
      </p>
      <b-row>
        <b-col cols="12" md="6" class="mb-1 mb-md-0">
          <b-button variant="light" block @click="signInMicrosoft">
            <b-img src="@/assets/images/logo/microsoft.svg" class="d-inline-block logo-image" />
            <span>Microsoft</span>
          </b-button>
        </b-col>
        <b-col cols="12" md="6">
          <b-button variant="light" block>
            <GoogleLogin
              :params="googleLoginControl.params"
              :on-success="onSuccessGoogle"
              :on-failure="onFailureGoogle"
            >
              <b-img src="@/assets/images/logo/google.svg" class="d-inline-block logo-image" />
              <span>Google</span>
            </GoogleLogin>
          </b-button>
        </b-col>
      </b-row>
    </section>
    <!--    <template v-slot:rodape>
      <b-img src="@/assets/images/logo/logo-secretaria-edu.png" />
    </template> -->
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '../AuthLayout.vue'
import IntermediateRedirectLoginDeepLink from '../components/IntermediateRedirectLoginDeepLink.vue'
import AuthMicrosoft from '@/auth/microsoft/AuthMicrosoft'
import router from '@/router'
import { postLoginGoogle } from '@/services/auth-context/login/Login.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import GoogleLogin from 'vue-google-login'
import { useToast } from 'vue-toastification/composition'

const auth = new AuthMicrosoft()
const toast = useToast()

const signInMicrosoft = async () => {
  auth.signIn({
    redirectToApp: true,
  })
}

const googleLoginControl = {
  params: {
    client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
    scope: 'profile email',
  },
}

const onSuccessGoogle = async googleUser => {
  const { id_token } = googleUser.getAuthResponse()

  const response = await postLoginGoogle(id_token, true)

  if (!response.status || response.status !== 200) {
    toast({
      component: Toast,
      props: {
        title: 'Erro',
        icon: 'AlertTriangleIcon',
        variant: 'danger',
        text: 'Erro ao tentar realizar login com o Google',
      },
    })
    return
  }

  const { token, refreshToken } = response.data

  router.push({
    name: 'loginDeepLink',
    query: { accountToken: token, refreshToken },
  })
}

const onFailureGoogle = () => {
  toast({
    component: Toast,
    props: {
      title: 'Erro',
      icon: 'AlertTriangleIcon',
      variant: 'danger',
      text: 'Erro ao realizar login com o Google',
    },
  })
}
</script>
<style lang="scss" scoped>
  .logo-image {
    width: 24px;
    margin-right: 10px;
  }
</style>