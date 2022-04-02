import wiki from 'wikipedia';
import * as fs from 'fs';

const NEED_TO_EXTRACT = 1e5;
const CLUSTER_SIZE = 1e2;

const titlesStorage: Array<string> = [];
let parseAggregator: { [key: string]: { text: string, categories: Array<string> }; } = {};

let amountOfDuplicates: number = 0;
let amountOfParseErrors: number = 0;
let amountOfParsed: number = 0;

(async () => {
    try {
        for(let i = 1; i <= NEED_TO_EXTRACT; i++) {
            if(i % CLUSTER_SIZE === 0) {
                console.log(`Writing in cluster ${i / CLUSTER_SIZE}`)
                fs.writeFileSync(`wiki_parse_results_cluster_${i / CLUSTER_SIZE}.json`, JSON.stringify(parseAggregator))
                parseAggregator = {};
            }
            try {
                const randomPage = await wiki.random() as { title: string };
                if(titlesStorage.includes(randomPage.title)) {
                    console.log(`Randomly found a duplicate: ${randomPage.title}`)
                    amountOfDuplicates++;
                    continue;
                }
                else {
                    console.log(`${i}th out of ${NEED_TO_EXTRACT} article with title "${randomPage.title}" is being parsed`);
                    titlesStorage.push(randomPage.title);
                    try {
                        const page = await wiki.page(randomPage.title);
                        parseAggregator[randomPage.title] = {
                            text: await page.content(), 
                            categories: await page.categories()
                        }
                        amountOfParsed++;
                    }
                    catch(e) {
                        console.log(`Couldn't parse ${randomPage.title}: ${e}`)
                        amountOfParseErrors++;
                    }
                }
            } catch(e) {
                console.log(`Failed to fetch: ${e}`)
            }
        }
    } finally {
        console.info('-------------------------------------')
        console.info(`Parsed: ${amountOfParsed}`)
        console.info(`Duplicates: ${amountOfDuplicates}`)
        console.info(`Errors: ${amountOfParseErrors}`)
    }
    
})()