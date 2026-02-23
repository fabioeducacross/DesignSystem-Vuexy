export default function initTypebot() {
  const typebotscript = document.createElement('script')
  typebotscript.setAttribute('type', 'module')

  typebotscript.text = `
  import Typebot from "https://cdn.jsdelivr.net/npm/@typebot.io/js@0/dist/web.js";

  Typebot.initStandard({
    id: 'bot1',
    typebot: "belinha-bot",
  });
`

  document.body.appendChild(typebotscript)
}
