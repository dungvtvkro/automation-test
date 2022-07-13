const { openBrowser, goto, write, press, closeBrowser, $, click } = require('taiko');
const URL = "https://www.pinksale.finance/launchpads/advanced?chain=BSC-Test";
const tableThead = ['Name', 'HC', 'Coin', 'InitialCap', 'KYC/Audit', 'Status', 'Links', 'TGOnline', 'Countdown'];

const loadData = async () => {
  try {
    await openBrowser();
    await goto(URL);
    await waitFor(3000);
    const noData = await $('No data').exists();
    const totalPage = (await $('.ant-pagination-item')._get()).length;
    if (!noData && totalPage > 0) {
      let datas = [];
      const pageCount = (await $('.ant-select-selection-item').text()).split('/')[0];
      for (let i = 1; i <= totalPage; i += 1) {
        datas = [...datas, ...(await crawTableData(totalPage, i, pageCount))]
        await click(`${i + 1}`);
        await waitFor(2000);
      }
      await saveCSV(datas)
    } else if (!noData && totalPage === 0) {
      closeBrowser();
      await loadData();
    }
  } catch (error) {
    console.error(error);
  } finally {
    closeBrowser();
  }
};

const crawTableData = async (totalPage, currentPage, pageCount) => {
  let rowCount = 1;
  if (currentPage === totalPage) {
    rowCount = (await $('.ant-table-row-level-0')._get()).length;
  } else {
    rowCount = Number(pageCount);
  }
  rowCount = Array.from(Array(rowCount).keys());
  const requests = rowCount.map(async (rowIndex) => {
    return await crawRowData(rowIndex + 1);
  });
  return await Promise.all(requests);
}

const crawRowData = async (row) => {
  const requests = tableThead.map(async (tr, index) => {
    if (index === 4) {
      const kycIconColor = await evaluate($(`.ant-table-row-level-0:nth-child(${row}) .has-text-centered svg:nth-child(1)`), (element) => {
        return element.getAttribute('color');
      })
      const auditIconColor = await evaluate($(`.ant-table-row-level-0:nth-child(${row}) .has-text-centered svg:last-child`), (element) => {
        return element.getAttribute('color');
      })
      return `${kycIconColor !== 'red'}/${auditIconColor !== 'red'}`;
    }
    return await tableCell({ row, col: index + 1 }).text();
  })
  return await Promise.all(requests);
}

const saveCSV = async (datas) => {
  const createCsvWriter = require('csv-writer').createArrayCsvWriter;
  const csvWriter = createCsvWriter({
    header: tableThead,
    path: '/Users/macbook/Downloads/file.csv'
  });

  csvWriter.writeRecords(datas)
    .then(() => {
      console.log('...Done');
    });
}

(async () => { await loadData() })();