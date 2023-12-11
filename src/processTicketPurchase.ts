import { Browser } from "puppeteer";

type IUser = {
  id: number;
  email: string;
  password: string;
  name: string;
  cardholderName: string;
  numberCard: string;
  cvc: string;
  cpf: string;
};

export const processTicketPurchase = async (
  browser: Browser,
  user: IUser,
  index: number
) => {
  // Cria uma nova página no navegador
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

  // Encontra o botão "Comprar" usando XPath
  const buttonBuy = (await page.$x(
    "/html/body/div/div/div/div[2]/div/button"
  )) as any;

  // Clica no botão "Comprar" se existir
  if (buttonBuy.length > 0) {
    await buttonBuy[0].click();
  }

  // Aguarda a abertura do modal de login
  await page.waitForXPath("/html/body/div[2]/div[3]");

  // Encontra os campos de email e senha usando XPath
  const inputEmail = await page.$x(`//*[@id=":r1:"]`);
  const inputPassword = await page.$x(`//*[@id="password"]`);

  // Insere valores de email e senha se os campos existirem
  if (inputEmail.length > 0) {
    await inputEmail[0].type(user.email);
  }

  if (inputPassword.length > 0) {
    await inputPassword[0].type(user.password); // Insira o valor da sua senha
  }

  // Encontra e clica no botão de login
  const buttonEnter = (await page.$x("/html/body/div[2]/div[3]/button")) as any;
  if (buttonEnter.length > 0) {
    await buttonEnter[0].click();
  }

  // Aguarda a aparição de um elemento específico após o login
  await page.waitForXPath("/html/body/div[3]/div[3]");

  // Array para armazenar assentos disponíveis
  let cadeirasLivres = [] as any[];

  // Encontra o elemento que contém informações sobre os assentos
  const cadeiras = await page.$x("/html/body/div[3]/div[3]");

  // Se as informações dos assentos existirem, itera pelos botões internos
  if (cadeiras.length > 0) {
    const buttonsInsideCadeiras = await cadeiras[0].$$("button");

    // Itera pelos botões para encontrar assentos disponíveis
    for (const button of buttonsInsideCadeiras) {
      const className = await button.evaluate((element) => element.className);

      // Verifica se o botão possui uma classe específica indicando um assento disponível
      if (className && className.includes("MuiButton-containedSuccess")) {
        // Adiciona o ID do assento ao array de assentos disponíveis
        cadeirasLivres.push(await button.evaluate((element) => element.id));
      }
    }
  }

  // Se não houver cadeiras disponíveis, exibe uma mensagem e fecha o navegador
  if (cadeirasLivres.length === 0) {
    console.log("Ingressos indisponíveis");
    await browser.close();
  }

  // Clica na primeira cadeira disponível
  await page.click(`#${cadeirasLivres[0]}`);

  // Aguarda a aparição do modal
  await page.waitForXPath(`/html/body/div[3]/div[3]/div`);

  // Encontra campos de input para nome do titular do cartão, número do cartão, CVC e CPF
  const inputCardholderName = await page.$x(
    `/html/body/div[3]/div[3]/div/div[1]/div/input`
  );
  const inputNumeroCartao = await page.$x(
    `/html/body/div[3]/div[3]/div/div[2]/div/input`
  );
  const inputCVC = await page.$x(
    `/html/body/div[3]/div[3]/div/div[3]/div/input`
  );
  const inputCPF = await page.$x(
    `/html/body/div[3]/div[3]/div/div[4]/div/input`
  );

  // Insere valores nos campos de nome do titular, número do cartão, CVC e CPF se existirem
  if (inputCardholderName.length > 0) {
    await inputCardholderName[0].type(user.cardholderName); // Insira o nome do titular do cartão
  }

  if (inputNumeroCartao.length > 0) {
    await inputNumeroCartao[0].type(user.numberCard); // Insira o número do cartão
  }

  if (inputCVC.length > 0) {
    await inputCVC[0].type(user.cvc); // Insira o CVC
  }

  if (inputCPF.length > 0) {
    await inputCPF[0].type(user.cpf); // Insira o CPF
  }

  // Encontra e clica no botão de compar
  const buttonSubmit = (await page.$x(
    "/html/body/div[3]/div[3]/div/button"
  )) as any;
  if (buttonSubmit.length > 0) {
    await buttonSubmit[0].click();
  }

  // Limpa o localStorage
  await page.evaluate(() => {
    localStorage.clear();
  });

  console.log(`Ingresso de ${user.name} comprado com sucesso x ${index+1}`);

  await page.close();
};
