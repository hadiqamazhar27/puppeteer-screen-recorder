const puppeteer = require('puppeteer');

const PuppeteerScreenRecorder = require('puppeteer-screen-recorder');

(async () => {
    //instantiate puppeteer
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',   
        headless: true,
        args: [
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-setuid-sandbox",
            "--no-sandbox",
        ]
    })

    //create a new page
    const page = await browser.newPage();

    //record video file
    const recorder = new PuppeteerScreenRecorder(page);
    console.log("recording started")
    await recorder.start("output.mp4");

    //navigate to youtube watch page
    console.log("Page opened!")
    await page.goto("https://www.youtube.com/watch?v=Tuw8hxrFBH8")
    const videoDuration = await page.$eval('video', (el) => el.duration)

    //play the video
    const playBtn = await page.$('.ytp-play-button')
    playBtn.click();
 
    await new Promise(function(resolve) {setTimeout(resolve, videoDuration * 1000)});

    //recording stops
    await recorder.stop();
    console.log("recording stopped")
    await page.close();
    await browser.close();
})();

// HELLO TESTING