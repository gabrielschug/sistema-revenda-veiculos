const prompt = require("prompt-sync")();
const fs = require("fs"); // fs: file system (para manipular aqruivos)

const modelos = [];
const marcas = [];
const anos = [];
const quilometragens = [];
const especificacoes = [];
const fipes = [];
const precos = [];
const fotos = [];

function inclusao() {

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n📝 Inclusão de Ativo\n" + "-".repeat(83) + "\n")

  // ENTRADAS de Dados
  console.log(`\n🔹 Informe Modelo, Marca, Ano, Quilometragem, Espeficicações, Valor da Tabela FIPE, % de Revenda e Foto do Veículo.\n\n⚠️ OBS.: Cancele a inclusão computando '0' em qualquer entrada.\n`)
  const a = prompt("Modelo......: ");
  const b = prompt("Marca............: ").toUpperCase();
  const c = prompt("Ano..........: ");
  const d = Number(prompt("Quilometragem.............: "));
  const e = prompt("Especificações.........: ");
  const f = Number(prompt("Valor da Tabela FIPE.........: "));
  let perc = Number(prompt(`% de Revenda .....: `));
  let recomendacao = (f * (perc/100))+f
  let info = console.log(`Valor Recomendado de Revenda: R$ ${recomendacao.toFixed(2)}`)
  const g = Number(prompt('Valor de Revenda.........: '));
  const h = prompt("URL  da foto.........: ");

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
  }
}
/*
function listagem() {
    // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n📋 Listagem dos Produtos Cadastrados\n" + "-".repeat(83) + "\n")

  console.log(
    `\nProduto............: Categoria: Igredientes............................: Preço....:\n`
  );

  for (let i in nomes) {
    console.log(
      `${nomes[i].padEnd(20)} ${categorias[i].padEnd(10)} ${igredientes[i].padEnd(40)}  R$ ${precos[i].toFixed(2)}`);
  }
  console.log()
}

function pesquisaCategoria() {
  if (fs.existsSync("produtos.txt")) {
    // SE produtos.txt existir ENTÃO...
    // Lê as linhas do .txt e fatia e separando as linhas (\n)
    const produtos = fs.readFileSync("produtos.txt", "utf-8").split("\n");

    // Título da Secção
    console.log('\n'+"-".repeat(83) + "\n🔍 Pesquisa por Categoria\n" + "-".repeat(83) + "\n");

    // Entrada da Categoria:
    const cat = prompt("🔹 Categoria............: ").toUpperCase();

    // Contador de Itens
    let contador = 0;
    for (i in categorias) {
        if (cat == categorias[i]) { // SE existir itens nesta categoria ENTÃO...
            contador++; // Conte...
        }
    }

    // Tabela dos Itens
    if (contador == 0) {// SE a Contagem deu 0 ENTÃO INFORME ...
        console.log("\n\n🔶 Não há itens nesta Categoria.");
    } else {
        console.log(`\n`+"-".repeat(83) +
        `\nProduto............: Categoria: Igredientes............................: Preço....:\n`);
        
        for (i in categorias) {
            if (cat == categorias[i]) {
            console.log(`${nomes[i].padEnd(20)} ${categorias[i].padEnd(10)} ${igredientes[i].padEnd(40)} R$ ${precos[i].toFixed(2).padStart(6)}`);
        }
        }console.log("\n");
    }
}
}

function pesquisaPreco() {
  if (fs.existsSync("produtos.txt")) {
    // SE produtos.txt existir ENTÃO...
    // Lê as linhas do .txt e fatia e separando as linhas (\n)
    const produtos = fs.readFileSync("produtos.txt", "utf-8").split("\n");

    // Título da Secção
    console.log(
      '\n'+"-".repeat(83) + "\n🔍 Pesquisa por Preço\n" + "-".repeat(83) + "\n"
    );

    // Entrada de preços mínimos e máximos:
    const min = Number(prompt("🔻 Preço Mínimo............: ")).toFixed(2);
    const max = Number(prompt("🔺 Preço Máximo............: ")).toFixed(2);

    // Contador de Itens
    let contador = 0;
    for (i in nomes) {
      if ((precos[i] >= min) & (precos[i] <= max)) {
        // SE existir preços nesta faixa de valores ENTÃO...
        contador++; // Conte...
      }

      // Tabela dos Itens
    }
    if (contador == 0) {
      // SE a Contagem deu 0 ENTÃO INFORME ...
      console.log("\n\n🔶 Não há itens nesta faixa de preços.");
    } else {
      console.log(
        `\n\n💵 Produtos entre R$ ${min} e R$ ${max}:\n` +
          `\nProduto............: Categoria: Igredientes............................: Preço....:\n`
      );

      for (i in nomes) {
        if ((precos[i] >= min) & (precos[i] <= max)) {
          console.log(
            `${nomes[i].padEnd(20)} ${categorias[i].padEnd(10)} ${igredientes[
              i
            ].padEnd(40)} R$ ${precos[i].toFixed(2).padStart(7)}`
          );
        }
      }
      console.log()
    }
  }
}

function cardapioWeb() {
  let conteudo = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cardápio |  Lancheria Avenida</title>
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
    <h1>🍔 LANCHERIA AVENIDA | Cardápio Online</h1>
    
    <table>
        <thead>

            <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Igredientes</th>
                <th>Preço R$</th>
                <th>Imagem Ilustrativa</th>
            </tr>
        </thead>
        <tbody>
        `;
  for (i in nomes) {
    conteudo += `
            <tr>
                <td>${nomes[i]}</td>
                <td>${categorias[i]}</td>
                <td>${igredientes[i]}</td>
                <td>${precos[i].toFixed(2)}</td>
                <td><img src="${fotos[i]}" alt="Foto do Produto"></td>
            </tr>
            `;
  }

  conteudo += `
                </tbody>
            </table>
        </body>
        </html>
        `;

  fs.writeFileSync("cardapioWeb.html", conteudo);

  console.log(
    `\n✅ Cardápio gerado com sucesso\nAcesse aqui: file:///C:/Users/gabri/Documents/GitHub/programa-lancheria/cardapioWeb.html`
  );
}

function CardapioporCategoria() {
  
  // Título da Secção
  console.log("-".repeat(83) + "\n🔍 Cadápio por Categoria Web\n" + "-".repeat(83) + "\n");

  // Entrada da Categoria

  const cat = prompt("🔹 Categoria............: ").toUpperCase();

  // Contador de Itens
  let contador = 0;
  for (i in categorias) {
      if (cat == categorias[i]) { // SE existir itens nesta categoria ENTÃO...
          contador++; // Conte...
      }
  }

  let conteudoInicio
  let conteudoMeio
    // Início da página
    conteudoInicio = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cardápio |  Lancheria Avenida</title>
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
      <h1>🍔 LANCHERIA AVENIDA | Cardápio Online</h1>
      ` 

    // Tabela dos Itens
    if (contador == 0) {// SE a Contagem deu 0 ENTÃO ...
        console.log("\n🔶 Não há itens nesta Categoria...\n")
        conteudoMeio = `
        <h3>🔶 Não há itens nesta Categoria...</h3>
        </body>
        </html>
        `
      } else {
        conteudoMeio = `
          <table>
            <thead>    
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Igredientes</th>
                <th>Preço R$</th>
                <th>Imagem Ilustrativa</th>      
        `

      for (i in categorias) {
        if (cat == categorias[i]) { // SE existir itens nesta categoria ENTÃO...
          conteudoMeio+=`
          <tr>
              <td>${nomes[i]}</td>
              <td>${categorias[i]}</td>
              <td>${igredientes[i]}</td>
              <td>${precos[i].toFixed(2)}</td>
              <td><img src="${fotos[i]}" alt="Foto do Produto"></td>
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
  fs.writeFileSync("cardapioCategoriaWeb.html", conteudo);

  // Finalizando o Processo
  console.log(
    `\n✅ Cardápio gerado com sucesso\nAcesse aqui: file:///C:/Users/gabri/Documents/GitHub/programa-lancheria/cardapioCategoriaWeb.html`
  );
}

function alterarProduto() {

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n💱 Alterar Nome de Produto\n" + "-".repeat(83) + "\n")

  // Exibe a TABELA de Produtos e Preços
  console.log(`\nID..: Produto............:\n`)
  for (let i in nomes) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${nomes[i].padEnd(20)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt("\n🔹 Informe o 'ID' do Produto: "))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > nomes.length) {
    console.log("\n🔶 Ops... O índice do produto informado não existe.")
  } else {
    prod-=1
    const nomeAntigo = nomes[prod]
    console.log(`   ${nomes[prod].padEnd(26)}`)
    do{
    novoNome = prompt("🔹 Infome o Novo Nome: ")
    } while(isNaN(novoNome)== false)
    nomes[prod] = novoNome
  
    console.log(`\n✅ Produto ${nomeAntigo} foi ALTERADO para ${(novoNome)}.`)
    
    gravaAtivos();
  }
}

function alterarCategoria() {

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n🛒 Alterar Categoria de Produto\n" + "-".repeat(83) + "\n")

  // Exibe a TABELA de Produtos e Preços
  console.log(`\nID..: Produto............: Categoria: \n`)
  for (let i in nomes) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${nomes[i].padEnd(20)} ${categorias[i].padEnd(10)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt("\n🔹 Informe o 'ID' do Produto: "))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > nomes.length) {
    console.log("\n🔶 Ops... O índice do produto informado não existe.")
  } else {
    prod-=1
    const infoAntigo = categorias[prod]
    console.log(`   ${nomes[prod].padEnd(26)} ${categorias[prod].padEnd(10)}`)
    do{
    novoNome = prompt("🔹 Infome a Nova Categoria:   ").toUpperCase()
    } while(isNaN(novoNome)== false)
    categorias[prod] = novoNome
  
    console.log(`\n✅ A Categoria ${infoAntigo} do Produto ${nomes[prod]} foi ALTERADA para ${(novoNome)}.`)
    
    gravaAtivos();
  }
}

function alterarIgredientes() {

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n🥗 Alterar Igredientes de Produto\n" + "-".repeat(83) + "\n")

  // Exibe a TABELA de Produtos e Preços
  console.log(`\nID..: Produto............: Igredientes............................: \n`)
  for (let i in nomes) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${nomes[i].padEnd(20)} ${igredientes[i].padEnd(40)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt("\n🔹 Informe o 'ID' do Produto: "))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > nomes.length) {
    console.log("\n🔶 Ops... O índice do produto informado não existe.")
  } else {
    prod-=1
    const infoAntigo = igredientes[prod]
    console.log(`   ${nomes[prod].padEnd(28)} ${igredientes[prod].padEnd(40)}`)
    do{
    novoNome = prompt("🔹 Infome os Novos Igredientes: ")
    } while(isNaN(novoNome)== false)
    igredientes[prod] = novoNome
  
    console.log(`\n✅ Os igredientes "${infoAntigo}" do Produto ${nomes[prod]} \nforam ALTERADOS para "${(novoNome)}".`)
    
    gravaAtivos();
  }
}

function alterarPreco() {

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n💱 Alterar Preço de Produto\n" + "-".repeat(83) + "\n")

  // Exibe a TABELA de Produtos e Preços
  console.log(`\nID..: Produto............: Preço....:\n`)
  for (let i in nomes) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${nomes[i].padEnd(20)} R$${String(Number(precos[i]).toFixed(2)).padStart(8)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt("\n🔹 Informe o 'ID' do Produto: "))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > nomes.length) {
    console.log("\n🔶 Ops... O índice do produto informado não existe.")
  } else {
    prod-=1
    console.log(`   ${nomes[prod].padEnd(26)} R$ ${Number(precos[prod]).toFixed(2)}`)
    do{
    novoPreco = Number(prompt("🔹 Infome o Novo Preço:       R$ "))
    } while(isNaN(novoPreco))
    precos[prod] = novoPreco
  
    console.log(`\n✅ O preço do produto ${nomes[prod]} foi ALTERADO para R$ ${(novoPreco.toFixed(2))}.`)
    
    gravaAtivos();
  }
}

function exclusao() {
  // TÍTULO da Secção
  console.log("-".repeat(83) + "\n❌ Excluir Produto\n" + "-".repeat(83) + "\n")

  // Exibe a TABELA de Produtos e Preços
  console.log(`\nProduto............:\n`
      )
  for (let i in nomes) {
    console.log(`${Number(i)+1} ${nomes[i].padEnd(20)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt("\n🔹 Nº do Produto: "))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (prod < 1 || prod > nomes.length || isNaN(prod)) {
    console.log("\n🔶 Ops... O índice do produto informado não existe.")
  } else {
    prod-=1
    let antigoProduto = nomes[prod]
    // Excluindo itens (método SPLICE)
    nomes.splice(prod,1)
    categorias.splice(prod,1)
    igredientes.splice(prod,1)
    precos.splice(prod,1)
    fotos.splice(prod,1)

    // Info de Exclusão e Salva Produtos
    console.log(`\n❌ Este produto EXCLUÍDO foi excluído.`)
    gravaAtivos();
  }
}

*/
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
    "\n"+"-".repeat(83) +
      "\n🚗 SCHUG REVENDA DE VEÍCULOS - CONTROLE DE ESTOQUE\n" +
      "-".repeat(83)
  );
  console.log("\n1. 📝 Inclusão de Ativo\n\n");
  console.log("2. 📋 Estoque de Ativos");
  console.log("3. 🔍 Pesquisa por Marca");
  console.log("3. 🔍 Pesquisa por Ano");
  console.log("4. 🔎 Pesquisa por Intervalo de Quilometragem");
  console.log("5. 🔎 Pesquisa por Intervalo de Preço\n");
  console.log("6. 🔡 Alterar Modelo do Ativo");
  console.log("7. 🛒 Alterar Marca de Ativo");
  console.log("8. 🥗 Alterar Ano de Ativo");
  console.log("9.💱 Alterar Quilometragem de Ativo");
  console.log("10.💱 Alterar Especificações de Ativo");
  console.log("11.💱 Alterar Preço do Ativo\n");
  console.log("12. 📖 Gerar Estoque Web");
  console.log("13. 🌐 Gerar Estoque Web por Marca");
  console.log("14. 🌐 Gerar Estoque Web por Ano");
  console.log("15. 🌐 Gerar Estoque Web por Intervalo de Quilometragem");
  console.log("16. 🌐 Gerar Estoque Web por Intervalo de Valor\n\n");
  console.log("17.❌ Excluir Ativo\n");
  console.log("18.↩️ Finalizar");
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
      pesquisaCategoria();
      break;
    }
    case 4: {
      pesquisaPreco();
      break;
    }
    case 5: {
      cardapioWeb();
      break;
    }
    case 6: {
      CardapioporCategoria();
      break;
    }
    case 7: {
      alterarProduto();
      break;
    }
        case 8: {
      alterarCategoria();
      break;
    }    case 9: {
      alterarIgredientes();
      break;
    }
    case 10: {
      alterarPreco();
      break;
    }
    case 11: {
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
