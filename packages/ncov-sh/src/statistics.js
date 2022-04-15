import { parsePath }                                                                     from '@acq/path'
import { subFiles }                                                                      from '@acq/path'
import { Table }                                                                         from '@analys/table'
import { Csv }                                                                           from '@spare/csv'
import { Deco, deco, decoFlat, decoMatrix, DecoTable, decoTable, logger, ros, says, Xr } from '@spare/logger'
import {
  time
}                                                                                        from '@valjoux/timestamp-pretty'
import { promises }                                                                      from 'fs'
import {
  date
}                                                                                        from '@valjoux/timestamp-pretty'
import { selectObject }                                                                  from '@vect/object-select'

const NCOV = 'ncov'
says[NCOV].attach(time)

export class Shanghai {
  浦东 = null
  黄浦 = null
  静安 = null
  徐汇 = null
  长宁 = null
  普陀 = null
  虹口 = null
  杨浦 = null
  宝山 = null
  闵行 = null
  嘉定 = null
  金山 = null
  松江 = null
  青浦 = null
  奉贤 = null
  崇明 = null
  add(region, diagn, asymp) {
    region = region.replace(/新?区/, '')
    if (region in this) this[region] = { diagn, asymp }
    return this
  }
  increDiagn(region, dDiagn) {
    // region = region.replace(/新?区/, '')
    const body = this[region] ?? (this[region] = { diagn: 0, asymp: 0 })
    body.diagn += dDiagn
    return this
  }
  increAsymp(region, dAsymp) {
    // region = region.replace(/新?区/, '')
    const body = this[region] ?? (this[region] = { diagn: 0, asymp: 0 })
    body.asymp += dAsymp
    return this
  }
  static get regions() { return [ '浦东', '黄浦', '静安', '徐汇', '长宁', '普陀', '虹口', '杨浦', '宝山', '闵行', '嘉定', '金山', '松江', '青浦', '奉贤', '崇明', ]}
  report() { return selectObject(this, Shanghai.regions) }
  reportDiagn() {
    const o = {}
    for (let region of Shanghai.regions) o[region] = this[region]?.diagn ?? null
    return o
  }
  reportAsymp() {
    const o = {}
    for (let region of Shanghai.regions) o[region] = this[region]?.asymp ?? null
    return o
  }
}

export class ShanghaiStatistics {
  static async processAlpha(input) {
    // const sample = '2022年3月29日，浦东新区新增169例本土确诊病例、2014例本土无症状感染者'
    // const sample = '2022年3月22日，浦东新区无新增本土确诊病例，新增237例本土无症状感染者'
    //                 2022年3月28日，浦东新区新增39例本土确诊病例，新增2467例本土无症状感染者
    //                  2022年4月7日，奉贤区新增31例本土新冠肺炎确诊病例，新增61例本土无症状感染者，分别居住于：
    //                  2022年4月8日，崇明区新增3例新冠肺炎本土确诊病例，新增167例本土无症状感染者
    //                  2022年4月6日，青浦区新增4例本土确诊病例，466例本土无症状感染者，分别居住于：
    //                  2022年4月4日，嘉定区新增4例本土确诊病例和233例本土无症状感染者，分别居住于
    //                  2022年4月3日，青浦新增3例本土确诊病例，新增229例本土无症状感染者，分别居住于：
    //                  2022年3月25日，奉贤区无新增本土确诊病例，无新增本土无症状感染者。
    //                  2022年3月21日（0-24时），普陀区新增1例本土确诊病例、30例本土无症状感染者，分别居住于：
    //                        3月21日，嘉定区新增5例本土确诊病例、98例无症状感染者，分别居住于
    //                  2022年3月20日，松江区新增9例本土无症状感染者，分别居住于：
    //                  2022年3月19日，闵行区新增4例本土确诊病例，为此前无症状感染者转归；新增49例本土无症状感染者，分别居住于：
    const REGEX_ALPHA = /((?:\d+年)?\d+月\d+日).*，(.+)(新增\d+例|无新增)(?:本土|新冠肺炎){0,2}确诊病例(?:，.*)?[、，；和]((?:新增)?\d+例|无新增)(?:本土|新冠肺炎){0,2}无症状感染者/g
    const REGEX_BETA = /((?:\d+年)?\d+月\d+日).*，(.+)(新增\d+例|无新增)(?:本土|新冠肺炎){0,2}无症状感染者/g
    function washNumber(text) { return text.replace('无新增', 0).replace(/(?:新增)?(\d+)例/, (_, num) => +num) }
    const shanghai = new Shanghai()
    let ms, ph, date, region, diagn, asymp
    while ((ms = await REGEX_ALPHA.exec(input)) && ([ ph, date, region, diagn, asymp ] = ms)) {
      // ({ region, diagn, asymp } |> deco |> logger)
      shanghai.add(region, washNumber(diagn), washNumber(asymp))
    }
    while ((ms = await REGEX_BETA.exec(input)) && ([ ph, date, region, asymp ] = ms)) {
      // ({ region, diagn, asymp } |> deco |> logger)
      shanghai.add(region, 0, washNumber(asymp))
    }
    return shanghai
  }

  static async processBeta(input, log) {
    // 病例1，女，35岁，居住于闵行区上中西路810弄
    // 病例4，女，8岁，就读于浦东新区竹园小学（长岛校区），居住于浦东新区浦东大道2778弄
    // 病例1—病例4，居住于浦东新区
    // 无症状感染者35，男，11岁，居住于浦东新区妙境路124弄
    // 无症状感染者52：女，55岁，居住于浦东新区浦东大道140弄
    // 无症状感染者6774—无症状感染者6878，居住于浦东新区
    // 无症状感染者51，男，59岁，外省来沪就医人员 (03-11)
    // 2022年4月2日0—24时，通过口岸联防联控机制
    // 无症状感染者31：男，57岁，居住于嘉定北工业区娄塘镇南新路471弄 (03-13)
    const shanghai = new Shanghai()
    const REGEX_DIAGNOSE = /病例(\d+)(?:—病例(\d+))?[，：](?:[男女]，\d+[岁月]龄?，)?(?:[^，]+，)?居住(?:地为|于)(.{2})新?区/g
    const REGEX_ASYMPTOM = /无症状感染者(\d+)(?:—无症状感染者(\d+))?[，：](?:[男女]，\d+[岁月]龄?，)?(?:[^，]+，)?居住(?:地为|于)(.{2})新?区/g
    let ms, ph, region, diagn, diagnEnd, asymp, asympEnd
    const count = { diagn: 0, asymp: 0 }

    while ((ms = await REGEX_DIAGNOSE.exec(input)) && ([ ph, diagn, diagnEnd, region ] = ms)) {
      count.diagn++
      const delta = diagnEnd ? +diagnEnd - +diagn + 1 : 1
      if (log) ({ ms, region, diagn, diagnEnd, delta } |> decoFlat |> logger)
      shanghai.increDiagn(region, delta)
    }

    while ((ms = await REGEX_ASYMPTOM.exec(input)) && ([ ph, asymp, asympEnd, region ] = ms)) {
      count.asymp++
      const delta = asympEnd ? +asympEnd - +asymp + 1 : 1
      if (log) ({ ms, region, asymp, asympEnd, delta } |> decoFlat |> logger)
      shanghai.increAsymp(region, delta)
    }
    count |> deco |> logger
    return shanghai
  }
}

const SRC = process.cwd() + '/packages/ncov-sh/resources'
const DEST = process.cwd() + '/packages/ncov-sh/output'

export const statistics = async () => {
  const files = await subFiles(SRC)
  const tables = {
    diagn: new Table([ '日期', ...Shanghai.regions ]),
    asymp: new Table([ '日期', ...Shanghai.regions ]),
  }

  for (let file of files) {
    const fileInfo = parsePath(SRC + '/' + file)
    const fileDate = new Date(fileInfo.base.slice(0, 10))
    const content = await promises.readFile(SRC + '/' + file)
    // const log = file === '2022-03-07.beta'
    const log = false
    const [ channel, shanghai ] = file.includes('beta')
      ? [ 'beta', await ShanghaiStatistics.processBeta(content, log) ]
      : [ 'alpha', await ShanghaiStatistics.processAlpha(content) ]
    Xr()[date(fileDate)](shanghai.report() |> Deco({ vert: 1 }))  |> says[NCOV].p(channel)
    tables.diagn.pushRow([ file, ...Object.values(shanghai.reportDiagn()) ])
    tables.asymp.pushRow([ file, ...Object.values(shanghai.reportAsymp()) ])
  }
  await promises.writeFile(DEST + '/diagn.csv', Csv.table(tables.diagn))
  await promises.writeFile(DEST + '/asymp.csv', Csv.table(tables.asymp))
  tables.diagn |> decoTable |> logger
  tables.asymp |> decoTable |> logger
}

statistics().then()