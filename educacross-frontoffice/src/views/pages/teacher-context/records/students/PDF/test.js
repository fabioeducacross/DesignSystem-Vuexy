// input a scss text
// inout a list of properties
// inout a number representing proportion
// mutiply all the properties in the list by the proportion
// output a scss text
const fs = require('fs')

const scss = `.titleBox {
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  width: 100%;
  margin-bottom: 3rem;
  margin-left: 4.7rem;
  span {
    border-bottom: 2px solid;
  }
}

.backgroundImage {
  background: url('~@/assets/images/pdf/cardBackground.png');
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #edf9f9;
}

.cardsBody {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.cardsContainer {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.customCardBody {
  border: 2px dashed #9c9c9c;
  width: 315px;
  height: 189.2857px;
  padding: 4.28px;
  margin-bottom: 1.4rem;
  background-color: transparent;
  letter-spacing: 0.7px;
  font-family: Roboto !important;

  .title {
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    height: 41.2079px;
    border-radius: 3.57px 3.57px 0 0;

    .institutionNameBox {
      width: 65%;
      height: 100%;
      display: flex;
      align-items: center;
      background-color: transparent;
      color: #0c5257;
      padding-left: 1.07rem;
      font-weight: bold;
      font-size: 11.428px;
    }

    .yearBox {
      width: 35%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      color: #424242;
      padding: 0.357rem;
      font-weight: 900;
      font-size: 14.28px;
    }
  }

  .centerContent {
    display: flex;
    justify-content: space-between;
    height: 97.144px;
    align-items: center;
    padding: 0 0.928rem;

    .photoContainer {
      display: flex;
      align-items: center;
      height: 100%;
      padding-left: 0.214rem;

      .photoCardimage {
        width: 64.28px !important;
        height: 64.28px !important;

        position: absolute;
        z-index: 9999;
      }
    }

    .allData {
      width: calc(100% - 74.28px);

      .qrcodeContainerAndData {
        display: flex;
        align-items: flex-start;
        width: 100%;
        height: 4.928rem;
        padding-right: 0.214rem;

        .dataContainer {
          line-height: 1.25;

          .studentName {
            font-weight: bold;
            font-size: 11.428px;
            font-style: normal;
            color: #0c5257;
            line-height: 1;
            padding-bottom: 1.428px;
          }

          .studentUsername {
            font-size: 10px;
            padding-bottom: 1.428px;
          }

          .studentPassword {
            font-size: 10px;
          }

          font-size: 1rem;
          color: black;
          font-weight: 500;
        }

        .qrCodeContainerNormalUser {
          display: none;
        }

        .qrCodeContainerNormalUserPrint {
          width: 71.43px;
          height: 71.43px;
          display: block;
        }

        .qrCodeContainerLexUser {
          display: none;
        }

        .qrCodeContainerLexUserPrint {
          width: 78.57px;
          height: 78.57px;
          display: block;
        }
      }

      .studentNameLex {
        font-size: 1.07rem;
        color: #222b45;
        font-weight: 400;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    height: 25.136px;
    border-radius: 0 0 3.57px 3.57px;
    padding: 0 1.07rem;

    .classnameBox {
      font-style: normal;
      font-weight: bold;
      font-size: 11.428px;
      height: 100%;
      align-items: center;
      display: flex;
      width: 52%;
      color: #0c5257;
    }

    .educacrossLogoBox {
      background-color: transparent;

      .brand-logo {
        width: 115px;
        height: 18.864px;
      }

      .wl-logo {
        height: 25px;
      }
    }
  }
}

.mt {
  margin-top: 2rem;
}

@media print {
  .customCardBody {
    -webkit-print-color-adjust: exact;
    page-break-inside: avoid;
  }

  @page {
    size: A4;
  }
}

.HTMLtoPdf {
  margin: 100px;
}`

const properties = [
  'font-size',
  'line-height',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-top',
  'width',
  'height',
  'padding',
  'letter-spacing',
  'padding-left',
  'padding-right',
  'padding-bottom',
  'padding-top',
]

const proportion = 1.25

const scssArray = scss.split('\n')
const newScssArray = []

scssArray.forEach(line => {
  let newLine = line
  properties.forEach(property => {
    if (line.includes(property)) {
      const value = line.split(': ')[1].split(';')[0]

      // separe px, em, rem, etc from number. ex: 1.4rem => 1.4, rem
      const number = parseFloat(value)
      const alphabet = value.replace(number, '')

      if (number === 'NaN') return
      if (alphabet === '%') return

      newLine = newLine.replace(`${value}`, `${number * proportion}${alphabet}`)
    }
  })
  newScssArray.push(newLine)
})

const newScss = newScssArray.join('\n')

// write to file
fs.writeFile('new.scss', newScss, err => {
  if (err) throw err
})
