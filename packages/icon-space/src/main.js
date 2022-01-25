import axios               from 'axios'
import { promises }        from 'fs'
import { deco, ros, says } from '@spare/logger'

const TOKEN = 'tWyoRMtwyhMMrb7Gl0saTBA3COU1o3wMkVONlYeO'

export async function iconSpace(id) {
  const { token } = this
  if (!id || !token) {
    throw new Error('invalid id or token')
  }
  // const url = `https://api-icons.icons8.com/publicApi/icons/icon?id=${id}&token=${token}`
  const response = await axios
    .get('https://api-icons.icons8.com/publicApi/icons/icon', {
      params: {
        id: id,
        token: token
      }
    })

  const data = response.data
  data |> deco |> says['response.data']
  if (!data?.success) {
    console.error('received data but not succeed')
    return { status: 'error', name: 'null' }
  }
  const icon = data?.icon
  const { svg, commonName } = icon
  const name = commonName ? (commonName + '-' + id) : id
  const fileName = process.cwd() + '/static/icons/' + name + '.svg'
  await promises.writeFile(fileName, svg ?? '')
  console.log('written', fileName)
  return { status: 'saved', name: name }
}

const ID = 'I3xDLhZzbLnY'

iconSpace.call({ token: TOKEN }, ID).then(o => { console.log(o.status, ros(o.name)) })