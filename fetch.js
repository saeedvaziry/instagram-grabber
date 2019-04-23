const fs = require('fs');
const download = require('download');
const Client = require('instagram-private-api').V1;

const Page = require('./models/Page');
const Post = require('./models/Post');

const fetch = async function () {
    const page = await Page.findOne();

    const device = new Client.Device(process.env.PAGE_USERNAME);
    const storage = new Client.CookieFileStorage(__dirname + '/cookies/' + process.env.PAGE_USERNAME + '.json');

    const session = await Client.Session.create(device, storage, process.env.PAGE_USERNAME, process.env.PAGE_PASSWORD);
    const account = await Client.Account.searchForUser(session, page.username);
    const feed = new Client.Feed.UserMedia(session, account.id);

    if (page.cursor) {
        feed.setCursor(page.cursor);
    }

    do {
        let data = await feed.get();
        let last = null;
        for (let i = 0; i < data.length; i++) {
            let isPostExists = await Post.findOne({
                where: {
                    pk: data[i].pk
                }
            });
            if (!isPostExists) {
                if (data[i].video_versions && data[i].video_versions.length > 0) {
                    let content = await download(data[i].video_versions[0].url);
                    await fs.writeFileSync(__dirname + '/downloads/' + data[i].pk + '.mp4', content);
                    await Post.create({
                        pk: data[i].pk,
                        type: 'video'
                    });
                    last = data[i].pk;
                }
            }
        }
        await page.update({
            cursor: feed.getCursor(),
            last: last
        });
        feed.setCursor(page.cursor);
    } while (feed.isMoreAvailable());
}

fetch();