export default function UserwayWidget() {
  const userwayscript = document.createElement('script')
  userwayscript.setAttribute('src', 'https://cdn.userway.org/widget.js')
  userwayscript.setAttribute('data-account', 'c2PSSm8dTy')
  document.head.appendChild(userwayscript)
}
