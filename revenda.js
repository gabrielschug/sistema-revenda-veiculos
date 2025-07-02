// IMPORTS ------------------------------------------------------------------------------------------

const prompt = require("prompt-sync")();
const fs = require("fs"); // fs: file system (para manipular aqruivos)

// ARRAYS -------------------------------------------------------------------------------------------

const modelos = [];
const marcas = [];
const anos = [];
const quilometragens = [];
const especificacoes = [];
const fipes = [];
const precos = [];
const fotos = [];

// SMART FUNCTIONS ----------------------------------------------------------------------------------

function chamaCabecalho() {
  console.log('Modelo..........: Marca......: Ano.: KM....: Espeficicações.......................: FIPE.......: REVENDA....:\n')
}

function chamaLinha(i) {
  console.log(
  `${modelos[i].padEnd(17)} ${marcas[i].padEnd(12)} ${String(anos[i]).padStart(5)} ${String(quilometragens[i].toLocaleString("pt-br")).padStart(7)} ${especificacoes[i].padEnd(38)} ${String(fipes[i].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })).padStart(12)} ${String(precos[i].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })).padStart(12)}`);
}

const htmlInicio = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Schug Revenda | ESTOQUE </title>
    <style>
        body {  font-family: Arial; margin: 30px; background-color: white;}
        h1 { color: brown; }
        table{width: 100%; border-collapse: collapse; background-color: white; border-bottom: 1px 1px 6px #999; border-radius: 8px; overflow: hidden;}
        th, td {padding: 12px; text-align: left; border-bottom: 1px solid #ccc;}
        th{background-color: #e0dede; color: #333;}
        img{max-width: 100px; max-height: 120px; border-radius:4px;}
        tr:hover {background-color: #f9f9f9;}
    </style>

</head>
<body>
    <h1> 🚗 SCHUG REVENDA DE VEÍCULOS | CONTROLE DE ESTOQUE</h1>
        `

const hmtlFinal = `
                </tbody>
            </table>
        </body>
        </html>
        `;

const htmlCabecalho = `
<table>
        <thead>
            <tr>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Ano</th>
                <th>Quilometragem</th>
                <th>Especificações</th>
                <th>Valor da FIPE</th>
                <th>Preço de Revenda</th>
                <th>Imagem</th>
            </tr>
        </thead>
        <tbody>
        `

// OPTIONS FUNCTIONS --------------------------------------------------------------------------------

function inclusao() {

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n📝 Inclusão de Ativo\n" + "-".repeat(83) + "\n")

  // ENTRADAS de Dados
  console.log(`\n🔹 Informe Modelo, Marca, Ano, Quilometragem, Espeficicações, Valor da Tabela FIPE, % de Revenda e Foto do Veículo.\n\n⚠️ OBS.: Cancele a inclusão computando '0' em qualquer entrada.\n`)
  const a = prompt("Modelo..............: ");
  const b = prompt("Marca...............: ").toUpperCase();
  const c = prompt("Ano.................: ");
  const d = Number(prompt("Quilometragem.......: "));
  const e = prompt("Especificações......: ");
  const f = Number(prompt("Valor da Tabela FIPE: "));
  let perc = Number(prompt(`% de Revenda.......: `));
  let recomendacao = (f * (perc/100))+f
  let info = console.log(`Valor Recomendado de Revenda: ${recomendacao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`)
  const g = Number(prompt('Valor de Revend.....: '));
  const h = prompt("URL  da foto........: ");

  // Se entrou algum valor zero: CANCELA
  if ([a,b,c,d,e,f,g,h].includes('0')){
    console.log('\n🔶 A  inclusão do produto foi cancelada...\n')

  } else{
    // INCLUINDO aos vetores
    modelos.push(a);
    marcas.push(b);
    anos.push(c);
    quilometragens.push(d);
    especificacoes.push(e);
    fipes.push(f);
    precos.push(g);
    fotos.push(h);
  
    // INFO de Conclusão + SALVAR
    console.log(`\n✅ Veículo Cadastrado com Sucesso!\n` + `-`.repeat(83));
    gravaAtivos();
    ativosWeb();
  }
}

function listagem() {
    // TÍTULO da Secção
  console.log('\n'+"-".repeat(109) + "\n📋 Listagem dos Ativos Cadastrados\n" + "-".repeat(109) + "\n")

  chamaCabecalho()

  for (let i in modelos) {
    chamaLinha(i)  
  }
  console.log()
}

function pesquisaMarca() {
  if (fs.existsSync("ativos.txt")) {
    // SE ativos.txt existir ENTÃO...
    // Lê as linhas do .txt e fatia e separando as linhas (\n)
    const ativos = fs.readFileSync("ativos.txt", "utf-8").split("\n");

    // Título da Secção
    console.log('\n'+"-".repeat(106) + "\n🔍 Pesquisa por Marca\n" + "-".repeat(106) + "\n");

    // Entrada da Categoria:
    const pesquisa = prompt("🔹 Marca............: ").toUpperCase();

    // Contador de Itens
    let contador = 0;
    for (i in modelos) {
        if (pesquisa == marcas[i]) { // SE existir itens nesta categoria ENTÃO...
            contador++; // Conte...
        }
    }

    // Tabela dos Itens
    if (contador == 0) {// SE a Contagem deu 0 ENTÃO INFORME ...
        console.log("\n\n🔶 Não há ativos desta Marca.");
    } else {
        console.log(`\n`+"-".repeat(109)) + chamaCabecalho();

        for (i in modelos) {
            if (pesquisa == marcas[i]) {
            chamaLinha(i);
        }
        }console.log("\n");
    }
}
}

function pesquisaAno() {
  if (fs.existsSync("ativos.txt")) {
    // SE ativos.txt existir ENTÃO...
    // Lê as linhas do .txt e fatia e separando as linhas (\n)
    const ativos = fs.readFileSync("ativos.txt", "utf-8").split("\n");

    // Título da Secção
    console.log(
      '\n'+"-".repeat(109) + "\n🔎 Pesquisa por Ano\n" + "-".repeat(109) + "\n"
    );

    // Entrada de anos mínimos e máximos:
    const min = Number(prompt("🔻 Ano Mínimo............: "));
    const max = Number(prompt("🔺 Ano Máximo............: "));

    // Contador de Itens
    let contador = 0;
    for (i in modelos) {
      if ((anos[i] >= min) & (anos[i] <= max)) {
        // SE existir anos nesta faixa de valores ENTÃO...
        contador++; // Conte...
      }

      // Tabela dos Itens
    }
    if (contador == 0) {
      // SE a Contagem deu 0 ENTÃO INFORME ...
      console.log("\n\n🔶 Não há ativos nesta faixa de anos.");
    } else {
      console.log(
        `\n\n💵 Ativos entre ${min} e ${max}:\n`) + chamaCabecalho()

      for (i in modelos) {
        if ((anos[i] >= min) & (anos[i] <= max)) {
          chamaLinha(i)
        }
      }
      console.log()
    }
  }
}

function pesquisaKm() {
  
  if (fs.existsSync("ativos.txt")) {
    // SE ativos.txt existir ENTÃO...
    // Lê as linhas do .txt e fatia e separando as linhas (\n)
    const ativos = fs.readFileSync("ativos.txt", "utf-8").split("\n");

    // Título da Secção
    console.log(
      '\n'+"-".repeat(109) + "\n🔍 Pesquisa por Quilometragem\n" + "-".repeat(109) + "\n"
    );

    // Entrada de anos mínimos e máximos:
    const min = Number(prompt("🔻 KM Mínima............: "));
    const max = Number(prompt("🔺 KM Máxima............: "));

    // Contador de Itens
    let contador = 0;
    for (i in modelos) {
      if ((quilometragens[i] >= min) & (quilometragens[i] <= max)) {
        // SE existir anos nesta faixa de valores ENTÃO...
        contador++; // Conte...
      }

      // Tabela dos Itens
    }
    if (contador == 0) {
      // SE a Contagem deu 0 ENTÃO INFORME ...
      console.log("\n\n🔶 Não há ativos nesta faixa de quilometragem.");
    } else {
      console.log(`\n\n🚗 Ativos entre ${min.toLocaleString('pt-BR')} km e ${max.toLocaleString('pt-BR')} km:\n`) + chamaCabecalho()

      for (i in modelos) {
        if ((quilometragens[i] >= min) & (quilometragens[i] <= max)) {
          chamaLinha(i)}
      }
      console.log()
    }
  }

}

function pesquisaPreco() {
  
  if (fs.existsSync("ativos.txt")) {
    // SE ativos.txt existir ENTÃO...
    // Lê as linhas do .txt e fatia e separando as linhas (\n)
    const ativos = fs.readFileSync("ativos.txt", "utf-8").split("\n");

    // Título da Secção
    console.log(
      '\n'+"-".repeat(109) + "\n🔎 Pesquisa por Preço\n" + "-".repeat(109) + "\n"
    );

    // Entrada de anos mínimos e máximos:
    const min = Number(prompt("🔻 Valor Mínimo............: "));
    const max = Number(prompt("🔺 valor Máximo............: "));

    // Contador de Itens
    let contador = 0;
    for (i in modelos) {
      if ((precos[i] >= min) & (precos[i] <= max)) {
        // SE existir anos nesta faixa de valores ENTÃO...
        contador++; // Conte...
      }

      // Tabela dos Itens
    }
    if (contador == 0) {
      // SE a Contagem deu 0 ENTÃO INFORME ...
      console.log("\n\n🔶 Não há ativos nesta faixa de preços.");
    } else {
      console.log(`\n\n💵 Ativos entre ${min.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} e ${max.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}:\n`) + chamaCabecalho()

      for (i in modelos) {
        if ((precos[i] >= min) & (precos[i] <= max)) {chamaLinha(i)}
      }
      console.log()
    }
  }

}

function ativosWeb() {
  let principal = modelos
  
  let conteudo = htmlInicio + htmlCabecalho
  
  for (i in principal) {
    conteudo += `
    <tr>
        <td>${modelos[i]}</td>
        <td>${marcas[i]}</td>
        <td>${anos[i]}</td>
        <td>${String(quilometragens[i].toLocaleString("pt-br", { maximumSignificantDigits: 2}))} km</td>
        <td>${especificacoes[i]}</td>
        <td>R$ ${String(fipes[i].toLocaleString("pt-br", { maximumSignificantDigits: 3}))}</td>
        <td>R$ ${String(precos[i].toLocaleString("pt-br", { maximumSignificantDigits: 3}))}</td>
        <td><img src="${fotos[i]}" alt="Veículo"></td>
    </tr>
    `
  }

  conteudo += hmtlFinal

  fs.writeFileSync("ativosWeb.html", conteudo);

  console.log(`\n✅ Estoque de Ativos gerado com sucesso\nAcesse aqui: file:///C:/Users/gabri/Documents/GitHub/revenda-veiculos/ativosWeb.html`
  );
}

function ativosMarcaWeb() {
  let principal = marcas
  let nome = 'Marca'

  // Título da Secção
  console.log("-".repeat(109) + `\n🌐 Gerar Estoque Web por ${nome}\n` + "-".repeat(109) + "\n");

  // Entrada da Categoria
  const pesquisa = prompt("🔹 Marca............: ").toUpperCase();

  // Contador de Itens
  let contador = 0;
  for (i in principal) {
      if (pesquisa == principal[i]) { // SE existir itens nesta categoria ENTÃO...
          contador++; // Conte...
      }
  }

  let conteudoInicio = htmlInicio
  let conteudoMeio

  // Tabela dos Itens
    if (pesquisa == principal[i]) {// SE a Contagem deu 0 ENTÃO ...
        console.log(`\n🔶 Não há Ativos deste ${nome}...\n`)
        conteudoMeio = `
        <h3>🔶 Não há Ativos neste invervalo de ${nome}...</h3>
        </body>
        </html>
        `
      } else {
        conteudoMeio = htmlCabecalho

      for (i in principal) {
        if (pesquisa == principal[i]) { // SE existir itens nesta categoria ENTÃO...
          conteudoMeio+= `
        <tr>
          <td>${modelos[i]}</td>
          <td>${marcas[i]}</td>
          <td>${anos[i]}</td>
          <td>${String(quilometragens[i].toLocaleString("pt-br", { maximumSignificantDigits: 2}))} km</td>
          <td>${especificacoes[i]}</td>
          <td>R$ ${String(fipes[i].toLocaleString("pt-br", { maximumSignificantDigits: 3}))}</td>
          <td>R$ ${String(precos[i].toLocaleString("pt-br", { maximumSignificantDigits: 3}))}</td>
          <td><img src="${fotos[i]}" alt="Veículo"></td>
        </tr>
        `
        }
      }

        conteudoMeio += `
          </tr>
          </tbody>
          </table>
          </body>
          </html>
          `
      }

  //Juntando as 3 partes
  conteudo = conteudoInicio + conteudoMeio

  // Incluindo o conteudo no html
  fs.writeFileSync("ativosPesquisaWeb.html", conteudo);

  // Finalizando o Processo
  console.log(
    `\n✅ Estoque gerado com sucesso\nAcesse aqui: file:///C:/Users/gabri/Documents/GitHub/revenda-veiculos/ativosPesquisaWeb.html`
  );
}

function ativosAnoWeb() {
  let principal = anos
  let nome = 'Ano'

  // Título da Secção
  console.log("-".repeat(109) + `\n🌐 Gerar Estoque Web por ${nome}\n` + "-".repeat(109) + "\n");

  // Entrada de intervalo mínimos e máximos:
  const min = Number(prompt(`🔻 ${nome} Mínimo............: `));
  const max = Number(prompt(`🔺 ${nome} Máximo............: `));  

  // Contador de Itens
  let contador = 0;
  for (i in principal) {
      if (principal[i] >= min & principal[i] <= max) { // SE existir itens nesta categoria ENTÃO...
          contador++; // Conte...
      }
  }

  let conteudoInicio = htmlInicio
  let conteudoMeio

  // Tabela dos Itens
    if (contador == 0) {// SE a Contagem deu 0 ENTÃO ...
        console.log(`\n🔶 Não há Ativos neste intervalo de ${nome}...\n`)
        conteudoMeio = `
        <h3>🔶 Não há Ativos neste intervalo de ${nome}...</h3>
        </body>
        </html>
        `
      } else {
        conteudoMeio = htmlCabecalho

      for (i in principal) {
        if (principal[i] >= min & principal[i] <= max) { // SE existir itens nesta categoria ENTÃO...
          conteudoMeio+= `
            <tr>
                <td>${modelos[i]}</td>
                <td>${marcas[i]}</td>
                <td>${anos[i]}</td>
                <td>${String(quilometragens[i].toLocaleString("pt-br", { maximumSignificantDigits: 2}))} km</td>
                <td>${especificacoes[i]}</td>
                <td>R$ ${String(fipes[i].toLocaleString("pt-br", { maximumSignificantDigits: 3}))}</td>
                <td>R$ ${String(precos[i].toLocaleString("pt-br", { maximumSignificantDigits: 3}))}</td>
                <td><img src="${fotos[i]}" alt="Veículo"></td>
            </tr>
            `
        }
      }

        conteudoMeio += `
          </tr>
          </tbody>
          </table>
          </body>
          </html>
          `
      }

  //Juntando as 3 partes
  conteudo = conteudoInicio + conteudoMeio

  // Incluindo o conteudo no html
  fs.writeFileSync("ativosPesquisaWeb.html", conteudo);

  // Finalizando o Processo
  console.log(
    `\n✅ Estoque gerado com sucesso\nAcesse aqui: file:///C:/Users/gabri/Documents/GitHub/revenda-veiculos/ativosPesquisaWeb.html`
  );
}

function ativosKmWeb() {
  let principal = quilometragens
  let nome = 'Quilometragem'

  // Título da Secção
  console.log("-".repeat(9) + `\n🌐 Gerar Estoque Web por ${nome}\n` + "-".repeat(109) + "\n");

  // Entrada de intervalo mínimos e máximos:
  const min = Number(prompt(`🔻 ${nome} Mínima............: `));
  const max = Number(prompt(`🔺 ${nome} Máxima............: `));  

  // Contador de Itens
  let contador = 0;
  for (i in principal) {
      if (principal[i] >= min & principal[i] <= max) { // SE existir itens nesta categoria ENTÃO...
          contador++; // Conte...
      }
  }

  let conteudoInicio = htmlInicio
  let conteudoMeio

  // Tabela dos Itens
    if (contador == 0) {// SE a Contagem deu 0 ENTÃO ...
        console.log(`\n🔶 Não há Ativos neste intervalo de ${nome}...\n`)
        conteudoMeio = `
        <h3>🔶 Não há Ativos neste intervalo de ${nome}...</h3>
        </body>
        </html>
        `
      } else {
        conteudoMeio = htmlCabecalho

      for (i in principal) {
        if (principal[i] >= min & principal[i] <= max) { // SE existir itens nesta categoria ENTÃO...
          conteudoMeio+= `
            <tr>
                <td>${modelos[i]}</td>
                <td>${marcas[i]}</td>
                <td>${anos[i]}</td>
                <td>${String(quilometragens[i].toLocaleString("pt-br", { maximumSignificantDigits: 2}))} km</td>
                <td>${especificacoes[i]}</td>
                <td>R$ ${String(fipes[i].toLocaleString("pt-br", { maximumSignificantDigits: 3}))}</td>
                <td>R$ ${String(precos[i].toLocaleString("pt-br", { maximumSignificantDigits: 3}))}</td>
                <td><img src="${fotos[i]}" alt="Veículo"></td>
            </tr>
            `
        }
      }

        conteudoMeio += `
          </tr>
          </tbody>
          </table>
          </body>
          </html>
          `
      }

  //Juntando as 3 partes
  conteudo = conteudoInicio + conteudoMeio

  // Incluindo o conteudo no html
  fs.writeFileSync("ativosPesquisaWeb.html", conteudo);

  // Finalizando o Processo
  console.log(
    `\n✅ Estoque gerado com sucesso\nAcesse aqui: file:///C:/Users/gabri/Documents/GitHub/revenda-veiculos/ativosPesquisaWeb.html`
  );
}

function ativosPrecoWeb() {
  let principal = precos
  let nome = 'Valor'

  // Título da Secção
  console.log("-".repeat(109) + `\n🌐 Gerar Estoque Web por Intervalo  de ${nome}\n` + "-".repeat(109) + "\n");

  // Entrada de intervalo mínimos e máximos:
  const min = Number(prompt(`🔻 ${nome} Mínimo............: `));
  const max = Number(prompt(`🔺 ${nome} Máximo............: `));  

  // Contador de Itens
  let contador = 0;
  for (i in principal) {
      if (principal[i] >= min & principal[i] <= max) { // SE existir itens nesta categoria ENTÃO...
          contador++; // Conte...
      }
  }

  let conteudoInicio = htmlInicio
  let conteudoMeio

  // Tabela dos Itens
    if (contador == 0) {// SE a Contagem deu 0 ENTÃO ...
        console.log(`\n🔶 Não há Ativos neste intervalo de ${nome}...\n`)
        conteudoMeio = `
        <h3>🔶 Não há Ativos neste intervalo de ${nome}...</h3>
        </body>
        </html>
        `
      } else {
        conteudoMeio = htmlCabecalho

      for (i in principal) {
        if (principal[i] >= min & principal[i] <= max) { // SE existir itens nesta categoria ENTÃO...
          conteudoMeio+= `
            <tr>
                <td>${modelos[i]}</td>
                <td>${marcas[i]}</td>
                <td>${anos[i]}</td>
                <td>${String(quilometragens[i].toLocaleString("pt-br", { maximumSignificantDigits: 2}))} km</td>
                <td>${especificacoes[i]}</td>
                <td>R$ ${String(fipes[i].toLocaleString("pt-br", { maximumSignificantDigits: 3}))}</td>
                <td>R$ ${String(precos[i].toLocaleString("pt-br", { maximumSignificantDigits: 3}))}</td>
                <td><img src="${fotos[i]}" alt="Veículo"></td>
            </tr>
            `
        }
      }

        conteudoMeio += `
          </tr>
          </tbody>
          </table>
          </body>
          </html>
          `
      }

  //Juntando as 3 partes
  conteudo = conteudoInicio + conteudoMeio

  // Incluindo o conteudo no html
  fs.writeFileSync("ativosPesquisaWeb.html", conteudo);

  // Finalizando o Processo
  console.log(
    `\n✅ Estoque gerado com sucesso\nAcesse aqui: file:///C:/Users/gabri/Documents/GitHub/revenda-veiculos/ativosPesquisaWeb.html`
  );
}

function alterarModelo() {
  let principal = modelos
  let nome = 'Modelo'

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(109) + "\n🔡 Alterar Modelo do Ativo\n" + "-".repeat(109) + "\n")

  // Exibe a TABELA de Ativos e Preços
  console.log(`\nID..: Modelo..........: \n`)
  for (let i in principal) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${principal[i].padEnd(20)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt(`\n🔹 Informe o 'ID' do ${nome}: `))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > principal.length) {
    console.log(`\n🔶 O índice do ${nome} informado não existe.`)
  } else {
    prod-=1
    const nomeAntigo = principal[prod]
    console.log(`   ${principal[prod].padEnd(26)}`)
    do{
    alteracao = prompt(`🔹 Infome o Novo ${nome}: `)
    } while(isNaN(alteracao)== false)
    
    //Item para alteração
    modelos[prod] = alteracao
  
    console.log(`\n✅ Ativo ${nomeAntigo} foi ALTERADO para ${(alteracao)}.`)
    
    gravaAtivos();
    ativosWeb();
  }
}

function alterarMarca() {
  let principal = marcas
  let nome = 'Marca'

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(109) + `\n🔖 Alterar ${nome} do Ativo\n` + "-".repeat(109) + "\n")

  // Exibe a TABELA de Ativos e Preços
  console.log(`\nID..: Modelo..........: \n`)
  for (let i in principal) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${modelos[i].padEnd(20)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt(`\n🔹 Informe o 'ID' do Ativo: `))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > principal.length) {
    console.log(`\n🔶 O índice do Ativo informado não existe.`)
  } else {
    prod-=1
    const nomeAntigo = principal[prod]
    console.log(`   ${principal[prod].padEnd(26)}`)
    do{
    alteracao = prompt(`🔹 Infome a Nova ${nome}: `).toUpperCase()
    } while(isNaN(alteracao)== false)
    
    //Item para alteração
    marcas[prod] = alteracao
  
    console.log(`\n✅ ${nome} do Ativo ${modelos[i]} foi ALTERADA de ${nomeAntigo} para ${(alteracao)}.`)
    
    gravaAtivos();
    ativosWeb();
  }
}

function alterarAno() {
  let principal = anos
  let nome = 'Ano'

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(109) + `\n🗓️ Alterar ${nome} do Ativo\n` + "-".repeat(109) + "\n")

  // Exibe a TABELA de Ativos e Preços
  console.log(`\nID..: Modelo..........: \n`)
  for (let i in principal) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${modelos[i].padEnd(20)}`);
  }

  // ENTRADA do índice do Ativo à alterar
  let prod = Number(prompt(`\n🔹 Informe o 'ID' do Ativo: `))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > principal.length) {
    console.log(`\n🔶 O índice do Ativo informado não existe.`)
  } else {
    prod-=1
    const nomeAntigo = principal[prod]
    console.log(`    ${principal[prod]}`)
    do{
    alteracao = Number(prompt(`🔹 Infome a Novo ${nome}: `))
    } while(isNaN(alteracao))
    
    //Item para alteração
    anos[prod] = alteracao
  
    console.log(`\n✅ ${nome} do Ativo ${modelos[i]} foi ALTERADO de ${nomeAntigo} para ${(alteracao)}.`)
    
    gravaAtivos();
    ativosWeb();
  }
}

function alterarKM() {
  let principal = quilometragens
  let nome = 'Quilometragem'

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(109) + `\n🛣️ Alterar ${nome} do Ativo\n` + "-".repeat(109) + "\n")

  // Exibe a TABELA de Ativos e Preços
  console.log(`\nID..: Modelo..........: \n`)
  for (let i in principal) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${modelos[i].padEnd(20)}`);
  }

  // ENTRADA do índice do Ativo à alterar
  let prod = Number(prompt(`\n🔹 Informe o 'ID' do Ativo: `))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > principal.length) {
    console.log(`\n🔶 O índice do Ativo informado não existe.`)
  } else {
    prod-=1
    const nomeAntigo = principal[prod]
    console.log(`    ${principal[prod].toLocaleString("pt-br")}`)
    do{
    alteracao = Number(prompt(`🔹 Infome a Nova ${nome}: `))
    } while(isNaN(alteracao))
    
    //Item para alteração
    quilometragens[prod] = alteracao
  
    console.log(`\n✅ ${nome} do Ativo ${modelos[prod]} foi ALTERADA de ${nomeAntigo.toLocaleString("pt-br")} km para ${(alteracao.toLocaleString("pt-br"))} km.`)
    
    gravaAtivos();
    ativosWeb();
  }
}

function alterarObs() {
  let principal = especificacoes
  let nome = 'Especificações'

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(109) + `\n✴️ Alterar ${nome} do Ativo\n` + "-".repeat(109) + "\n")

  // Exibe a TABELA de Ativos e Preços
  console.log(`\nID..: Modelo..........: \n`)
  for (let i in principal) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${modelos[i].padEnd(20)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt(`\n🔹 Informe o 'ID' do Ativo: `))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > principal.length) {
    console.log(`\n🔶 O índice do Ativo informado não existe.`)
  } else {
    prod-=1
    const nomeAntigo = principal[prod]
    console.log(`   ${principal[prod].padEnd(26)}`)
    do{
    alteracao = prompt(`🔹 Infome as Novas ${nome}: `)
    } while(isNaN(alteracao)== false)
    
    //Item para alteração
    especificacoes[prod] = alteracao
  
    console.log(`\n✅ ${nome} do Ativo ${modelos[i]} foram ALTERADAS de '${nomeAntigo}' para '${(alteracao)}'.`)
    
    gravaAtivos();
    ativosWeb();
  }
}

function alterarPreco() {
  let principal = precos
  let nome = 'Valor'

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(109) + `\n💱 Alterar ${nome} do Ativo\n` + "-".repeat(109) + "\n")

  // Exibe a TABELA de Ativos e Preços
  console.log(`\nID..: Modelo..........: \n`)
  for (let i in principal) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${modelos[i].padEnd(20)}`);
  }

  // ENTRADA do índice do Ativo à alterar
  let prod = Number(prompt(`\n🔹 Informe o 'ID' do Ativo: `))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > principal.length) {
    console.log(`\n🔶 O índice do Ativo informado não existe.`)
  } else {
    prod-=1
    const nomeAntigo = principal[prod]
    console.log(`   ${principal[prod].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`)
    do{
    alteracao = Number(prompt(`🔹 Infome o Novo ${nome}: `))
    } while(isNaN(alteracao))
    
    //Item para alteração
    precos[prod] = alteracao
  
    console.log(`\n✅ ${nome} do Ativo ${modelos[prod]} foi ALTERADO de ${nomeAntigo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} para ${(alteracao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.`)
    
    gravaAtivos();
    ativosWeb();
  }
}

function exclusao() {
  // TÍTULO da Secção
  console.log("-".repeat(109) + "\n❌ Excluir Produto\n" + "-".repeat(109) + "\n")

  // Exibe a TABELA de Produtos e Preços
  console.log(`\nModelo..........: \n`
      )
  for (let i in modelos) {
    console.log(`${Number(i)+1} ${modelos[i].padEnd(17)}`);
  }

  // ENTRADA do índice do ativo à alterar
  let prod = Number(prompt("\n🔹 Nº do Ativo: "))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (prod < 1 || prod > modelos.length || isNaN(prod)) {
    console.log("\n🔶 O índice do produto informado não existe.")
  } else {
    prod-=1
    const antigoProduto = modelos[prod]
    // Excluindo itens (método SPLICE)
    modelos.splice(prod,1)
    marcas.splice(prod,1)
    anos.splice(prod,1)
    quilometragens.splice(prod,1)
    especificacoes.splice(prod,1)
    fipes.splice(prod,1)
    precos.splice(prod,1)
    fotos.splice(prod,1)

    // Info de Exclusão e Salva Produtos
    console.log(`\n❌ O Ativo ${antigoProduto} foi EXCLUÍDO.`)
    gravaAtivos();
    ativosWeb();
  }
}

function gravaAtivos() {
  const ativos = [];

  for (i in modelos) {
    ativos.push(
      modelos[i] + ";" +
      marcas[i] + ";" +
      anos[i] + ";" +
      quilometragens[i] + ";" +
      especificacoes[i] + ";" +
      fipes[i] + ";" +
      precos[i] + ";" +
      fotos[i]
    );

  }

  //Salvar dados do Vetor
  fs.writeFileSync("ativos.txt", ativos.join("\n"));
  console.log(`\n🔹 Volte Sempre!\n`);
}

function obtemProdutos() {
  if (fs.existsSync("ativos.txt")) {
    // SE ativos.txt existir ENTÃO...

    // Lê as linhas do .txt e fatia e separando as linhas (\n)
    const ativos = fs.readFileSync("ativos.txt", "utf-8").split("\n");

    // Separa e manda pros vetores
    for (i in ativos) {
      const partes = ativos[i].split(";");

      modelos.push(partes[0]);
      marcas.push(partes[1]);
      anos.push(Number(partes[2]));
      quilometragens.push(Number(partes[3]));
      especificacoes.push(partes[4]);
      fipes.push(Number(partes[5]));
      precos.push(Number(partes[6]));
      fotos.push(partes[7]);
    }
  }
}

// Carregar lista de produtos antes do Menu (se existir arquivo)
obtemProdutos();

//---------------------------------- PROGRAMA PRINCIPAL ---------------------------------------

menuPrincipal: 
do {
  console.log(
    "\n"+"-".repeat(109) +
      "\n🚗 SCHUG REVENDA DE VEÍCULOS - CONTROLE DE ESTOQUE\n" +
      "-".repeat(109)
  );
  console.log("\n1. 📝 Inclusão de Ativo\n\n");
  console.log("2. 📋 Estoque de Ativos");
  console.log("3. 🔍 Pesquisa por Marca");
  console.log("4. 🔎 Pesquisa por Ano");
  console.log("5. 🔍 Pesquisa por Intervalo de Quilometragem");
  console.log("6. 🔎 Pesquisa por Intervalo de Preço\n");
  console.log("7. 🔡 Alterar Modelo do Ativo");
  console.log("8. 🔖 Alterar Marca de Ativo");
  console.log("9. 🗓️  Alterar Ano de Ativo");
  console.log("10.🛣️  Alterar Quilometragem de Ativo");
  console.log("11.✴️  Alterar Especificações de Ativo");
  console.log("12.💱 Alterar Preço do Ativo\n");
  console.log("13. 📖 Gerar Estoque Web");
  console.log("14. 🌐 Gerar Estoque Web por Marca");
  console.log("15. 🌐 Gerar Estoque Web por Ano");
  console.log("16. 🌐 Gerar Estoque Web por Intervalo de Quilometragem");
  console.log("17. 🌐 Gerar Estoque Web por Intervalo de Valor\n\n");
  console.log("18.❌ Excluir Ativo\n");
  console.log("19.↩️ Finalizar");
  const opcao = Number(prompt("\n🔸 Opção: "));

  switch (opcao) {
    case 1: {
      inclusao();
      break;
    }
    case 2: {
      listagem();
      break;
    }
    case 3: {
      pesquisaMarca();
      break;
    }
    case 4: {
      pesquisaAno();
      break;
    }
    case 5: {
      pesquisaKm();
      break;
    }
    case 6: {
      pesquisaPreco();
      break;
    }
    case 7: {
      alterarModelo();
      break;
    }
    case 8: {
      alterarMarca();
      break;
    }    
    case 9: {
      alterarAno();
      break;
    }
    case 10: {
      alterarKM();
      break;
    }
    case 11: {
      alterarObs();
      break;
    }
    case 12: {
      alterarPreco();
      break;
    }
    case 13: {
      ativosWeb();
      break;
    }
    case 14: {
      ativosMarcaWeb();
      break;
    }
    case 15: {
      ativosAnoWeb();
      break;
    }
    case 16: {
      ativosKmWeb();
      break;
    }
    case 17: {
      ativosPrecoWeb();
      break;
    }
    case 18: {
      exclusao();
      break;
    }
    default: {
      break menuPrincipal;
    }
  }
} while (true);

// Chamar função gravaAtivos(), assim que o programa finalizar
gravaAtivos();