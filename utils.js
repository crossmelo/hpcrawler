'use strict';
const cheerio = require('cheerio');
const request = require('request');
const colors = require('colors');
const reg = /\n|\s+/g;
const reg2 = /<[^>]*>/g;
const reg3 = /发自|手机|虎扑|m.hupu.com|客户端|iPhone|Android/g;
const reg4 = /&nbsp;/g;
const highlightList = ['希夏邦驴', '东方无愧', '再碰中位emo', '波king', '鲁西有救了', '国足啊队长']; // 大佬们

class Spider {
  fetch(url, callback) {
    request({ url: url, encoding: null }, (err, response, body) => {
      if (!err && response.statusCode === 200) {
        callback(
          null,
          cheerio.load('<body>' + body + '</body>', { decodeEntities: false })
        );
      } else {
        callback(err, cheerio.load('<body></body>'));
      }
    });
  }

  parseLen(err, $) {
    if (!err) {
      const result = $('.hupu-rc-pagination-item').eq(-1).text();
      return result;
    }
  }

  parseData(err, $) {
    if (!err) {
      $('.bbs-post-wrapper-content .post-reply-list').each((i, v) => {
        const author = $(v)
          .find('.reply-list-content .user-base-info')
          .find('a')
          .eq(0)
          .text();
        const text = $(v)
          .find('.post-reply-list-content .m-c .thread-content-detail')
          .html()
          .replace(reg, '')
          .replace(reg2, '')
          .replace(reg3, '')
          .replace(reg4, ';');
        if (highlightList.includes(author)) {
          console.log(author.yellow, ':', text.yellow);
        } else {
          console.log(author, ':', text);
        }
      });
    }
  }
}


exports = module.exports = queryLen;

function queryLen(tiezi) {
  const spider = new Spider();
  spider.fetch(`https://bbs.hupu.com/${tiezi}.html`, async (err, $) => {
    const len = spider.parseLen(err, $);
    // await queryData(len - 2);
    await queryData(tiezi, len - 1);
    await queryData(tiezi, len);

    console.log('--------------------------------------------------');
  });
}

function queryData(tiezi, len) {
  return new Promise((resolve, reject) => {
    const spider = new Spider();
    spider.fetch(`https://bbs.hupu.com/${tiezi}-${len}.html`, (err, $) => {
      console.log(`第${len}页`, '----------------------------');
      const result = spider.parseData(err, $);
      resolve();
    });
  });
}