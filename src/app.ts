import puppeteer from "puppeteer";
import { prismaClient } from "./services/prisma.service";
import { processTicketPurchase } from "./processTicketPurchase";
import readlineSync from "readline-sync";

(async () => {
  // Inicia uma nova instância do navegador com as configurações especificadas
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
  });

  const users = await prismaClient.user.findMany();

  const quantity = readlineSync.question(
    "Quantos ingressos você gostaria de comprar por sócio?"
  );

  for (let index = 0; index < users.length; index++) {
    for (let i = 0; i < Number(quantity); i++) {
      await processTicketPurchase(browser, users[index], i);
    }
  }
  // Fecha o navegador
  await browser.close();
})();
