import { Institute } from '@geia/cluster-institute'
import { Signaler }  from '@geia/signaler'
import { init }      from '@vect/vector-init'
import cluster       from 'cluster'

export class ProcessPool {
  constructor(file, max, prep) {
    this.institute = Institute.build({ exec: file, refork: false, count: 0 })
    this.max = max
    this.idle = prep ? init(Math.min(max, prep), this.institute.graduate.bind(this.institute)) : []
    this.busy = []
    this.queue = []
    Signaler.register({ process: process, worker: cluster.workers })
  }

  get clientWaiting() { return this.queue.length }
  get hireSpace() { return this.max - (this.idle.length + this.busy.length) }

  enqueue(data) {
    const worker = this.recruit()
    if (worker) {
      return this.busy.push(worker), worker.send(data), this.hireSpace
    } else {
      return this.queue.push(data), 0
    }
  }

  recruit() {
    if (this.idle.length) return this.idle.pop()
    if (this.hireSpace > 0) return this.institute.graduate()
    return null
  }

  release(worker) {
    if (this.clientWaiting) {
      worker.send(this.queue.shift())
    } else {
      removeIfExist(this.busy, worker), this.idle.push(worker)
    }
    return this.hireSpace
  }
}

const removeIfExist = (vec, el) => {
  let i
  if ((i = vec.indexOf(el)) >= 0) { vec.splice(i, 1) }
  return vec
}