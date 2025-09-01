import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label  } from "recharts"

const data = [
  {
    name: '1',
    temperatura: 40,
    velocidade: 10,
  },
  {
    name: '2',
    temperatura: 38,
    velocidade: 5,
  },
  {
    name: '3',
    temperatura: 37,
    velocidade: 3,
  },
  {
    name: '4',
    temperatura: 30,
    velocidade: 0,
  },
  {
    name: '5',
    temperatura: 55,
    velocidade: 4,
  },
  {
    name: '6',
    temperatura: 20,
    velocidade: 5,
  },
  {
    name: '7',
    temperatura: 25,
    velocidade: 3,
  },
  {
    name: '8',
    temperatura: 10,
    velocidade: 1,
  },
  {
    name: '9',
    temperatura: 42,
    velocidade: 8,
  },
  {
    name: '10',
    temperatura: 26,
    velocidade: 9,
  },
];


export default function Home(){
  const [temperatura, setTemperatura] = useState(0)
  const [velocidade, setVelocidade] = useState(0)

  function clicouTemp(){
    let var_temperatura = temperatura
    var_temperatura = var_temperatura + 1
    setTemperatura(var_temperatura)
  }
  function clicouVelo(){
    let var_velocidade = velocidade
    var_velocidade = var_velocidade + 1
    setVelocidade(var_velocidade)
  }



  return(
    <div className="bg-gray-900 w-full h-screen flex flex-col">
      <div className="flex flex-col items-center h-1/3 pt-4">
        <h1 className="text-7xl text-amber-400">
          Telemetria Trainee Solares
        </h1>
      </div>

      <div className="flex items-center justify-around h-28">
        <h2 className="text-4xl text-white">
          Temperatura: <button className="bg-blue-500 text-white p-2 rounded-md w-52" onClick={clicouTemp}> press </button>
        </h2>
        <h2 className="text-4xl text-white">
          Velocidade: <button className="bg-red-600 text-white p-2 rounded-md w-52" onClick={clicouVelo}> press </button>
        </h2>
      </div>

<div className="flex items-center justify-around">
        <h3 className="border border-blue-500 p-2 text-4xl text-white">
          {temperatura}
        </h3>
        <h3 className="border border-red-600 p-2 text-4xl text-white">
          {velocidade}
        </h3>
      </div>
      
      <div className="flex w-full gap-8 px-8 mt-8 bg-gray-900"> 


        <div className="flex-1 h-96 bg-gray-800 p-4 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label={{ value: 'Tempo(s)', angle: 0, position: "insideBottom", offset: -3 }} />
              <YAxis label={{ value: 'Temperatura(°C)', angle: -90, position: 'insideLeft'  }}
              domain={[-40,80]}   
              tickCount={7}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperatura" stroke="#10a9eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 h-96 bg-gray-800 p-4 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label={{ value: 'Tempo(s)', angle: 0, position: "insideBottom", offset: -3 }} />
              <YAxis label={{ value: 'Velocidade(N)', angle: -90, position: 'insideLeft' }} 
              domain={[0,10]}
              tickCount={10}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="velocidade" stroke="#FF0000" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div> 

    </div> 
  )
}