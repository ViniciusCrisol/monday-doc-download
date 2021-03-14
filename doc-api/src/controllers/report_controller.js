import ejs from 'ejs';
import path from 'path';
import puppeteer from 'puppeteer';

async function get(request, response) {
  const { id } = request.params;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const { BASE_URL } = process.env;

  await page.goto(`${BASE_URL}/create/report/${id}`, {
    waitUntil: 'networkidle0',
  });

  const pdf = await page.pdf({
    printBackground: true,
    format: 'Letter',
  });

  await browser.close();

  response.contentType('application/pdf');
  return response.send(pdf);
}

async function create(request, response) {
  const filePath = path.join(__dirname, '..', 'views', 'report.ejs');
  ejs.renderFile(filePath, { id: request.params.id }, (err, html) => {
    if (err) return response.send('Error, try again!');

    return response.send(html);
  });
}

export { get, create };
