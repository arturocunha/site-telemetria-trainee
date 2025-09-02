import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { io, Socket } from "socket.io-client";

// O tipo de dado para um ponto no gráfico
type ChartDatum = {
  name: string; // Usaremos um timestamp ou um contador simples aqui
  temperatura: number;
  velocidade: number;
};

// Dados iniciais para preencher o gráfico antes de receber dados reais
const INITIAL_CHART_DATA: ChartDatum[] = Array.from({ length: 10 }, (_, i) => ({
  name: `${i + 1}s`,
  temperatura: 0,
  velocidade: 0,
}));

export default function Home() {
  // Mantemos os estados para os valores atuais para exibição
  const [temperatura, setTemperatura] = useState<number>(0);
  const [velocidade, setVelocidade] = useState<number>(0);
  // Estado para os dados do gráfico
  const [chartData, setChartData] = useState<ChartDatum[]>(INITIAL_CHART_DATA);

  useEffect(() => {
    const socket: Socket = io("http://localhost:4000");

    // Vamos focar no evento "telemetry" que envia ambos os dados
    socket.on("telemetry", (data: { temperatura: number, velocidade: number }) => {
      
      // 1. Atualiza os valores para exibição nos painéis
      setTemperatura(data.temperatura);
      setVelocidade(data.velocidade);

      // 2. Atualiza os dados do gráfico com a lógica de "janela deslizante"
      setChartData(prevData => {
        // Cria um novo ponto de dado
        const newPoint: ChartDatum = {
          name: new Date().toLocaleTimeString(), // Usa a hora atual como rótulo no eixo X
          temperatura: data.temperatura,
          velocidade: data.velocidade,
        };

        // Remove o primeiro item (o mais antigo) e adiciona o novo no final.
        // Isso faz o gráfico "deslizar" para a esquerda.
        const updatedData = [...prevData.slice(1), newPoint];
        
        return updatedData;
      });
    });

    // É uma boa prática desligar os listeners antigos para evitar duplicação se o componente re-renderizar
    // Embora com o array de dependências vazio, isso só roda uma vez.
    return () => {
      socket.off("telemetry");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-900 w-full h-screen flex flex-col overflow-x-hidden">
      <div className="flex flex-col items-center h-1/3 pt-4">
        <h1 className="text-7xl text-amber-400">
          Telemetria Trainee Solares
        </h1>
      </div>

      <div className="flex items-center justify-around h-28">
        <h2 className="text-4xl text-white">
          Temperatura:
        </h2>
        <h2 className="text-4xl text-white">
          Velocidade:
        </h2>
      </div>

      <div className="flex items-center justify-around">
        <h3 className="border border-blue-500 p-2 text-4xl text-white">
          {(Number(temperatura)).toFixed(2)} °C
        </h3>
        <h3 className="border border-red-600 p-2 text-4xl text-white">
          Nivel: {(Number(velocidade)).toFixed(0)} 
        </h3>
      </div>
      
      <div className="flex w-full gap-8 px-8 mt-8 bg-gray-900"> 

        <div className="flex-1 h-96 bg-gray-800 p-4 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                label={{ value: 'Temperatura(°C)', angle: -90, position: 'insideLeft'  }}
                domain={[-40, 80]}   
                tickCount={7}
              />
              <Tooltip />
              <Legend />
              <Line isAnimationActive={false} type="monotone" dataKey="temperatura" stroke="#10a9eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 h-96 bg-gray-800 p-4 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                label={{ value: 'Velocidade(N)', angle: -90, position: 'insideLeft' }} 
                domain={[0, 10]}
                tickCount={10}
              />
              <Tooltip />
              <Legend />
              <Line isAnimationActive={false} type="monotone" dataKey="velocidade" stroke="#FF0000" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div> 

    </div> 
  )
}