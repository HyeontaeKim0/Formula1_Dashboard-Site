"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import { getTeamColor } from "@/lib/utils/driverUtils";

interface ChartDataPoint {
  driverNumber: number;
  round: number;
  position: number | string;
  roundLabel: string;
  positionLabel: string;
}

interface ChartDataWithDisplay extends ChartDataPoint {
  displayPosition: number; // 차트에 표시할 숫자 position
  originalPosition: number | string; // 원본 position (NC 등)
}

interface DriverRankChartProps {
  data: ChartDataPoint[];
  driverCode: string;
  driverNumber: number;
}

export default function DriverRankChart({
  data,
  driverCode,
  driverNumber,
}: DriverRankChartProps) {
  // Y축 역순 처리: 1위가 위에 오도록
  // "NC" 등 문자열 position은 제외하고 계산
  const numericPositions = data
    .map((d) => d.position)
    .filter((p): p is number => typeof p === "number");
  const maxPosition = numericPositions.length > 0 
    ? Math.max(...numericPositions, 20) 
    : 20;
  const minPosition = 1;

 

  // Y축 틱 생성 (1, 5, 10, 30 등)
  const generateYTicks = () => {
    const ticks = [1];
    if (maxPosition > 5) ticks.push(5);
    if (maxPosition > 10) ticks.push(10);
    if (maxPosition > 20) ticks.push(20);
    if (maxPosition > 30) ticks.push(30);
    return ticks.sort((a, b) => b - a); // 역순 정렬
  };

  const yTicks = generateYTicks();

  // Y축 포맷터
  const formatYAxis = (value: number) => {
    return `${value}위`;
  };

  // X축 포맷터
  const formatXAxis = (value: number) => {
    return `${value}R`;
  };

  // 커스텀 도트
  const CustomDot = (props: {
    cx?: number;
    cy?: number;
    payload?: ChartDataWithDisplay;
  }) => {
    const { cx, cy, payload } = props;
  

    if (cx === undefined || cy === undefined) return null;

    return (
      <Dot
        cx={cx}
        cy={cy}
        r={6}
        fill={getTeamColor(payload?.driverNumber)} 
        stroke="#fff"
        strokeWidth={2}
      />
    );
  };

  // "NC"인 경우를 처리하기 위해 데이터를 변환
  // "NC"인 경우 차트 하단(maxPosition + 1)에 표시하되, 선은 이어지도록 함
  const chartData: ChartDataWithDisplay[] = data.map((d) => {
    const isNC = typeof d.position === "string" && d.position === "NC";
    return {
      ...d,
      originalPosition: d.position,
      displayPosition: isNC ? maxPosition + 1 : (d.position as number),
    };
  });


  return (
    <div className="w-full h-[500px] p-6 bg-white rounded-lg shadow-sm">
     
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 60, right: 50, left: 10, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="round"
            tickFormatter={formatXAxis}
            stroke="#6B7280"
            tick={{ fill: "#6B7280" }}
            label={{
              value: "",
              position: "insideBottomRight",
              offset: -10,
              style: { textAnchor: "start", fill: "#6B7280" },
            }}
          />
          <YAxis
            domain={[minPosition, maxPosition + 1]}
            tickFormatter={formatYAxis}
            reversed={true} // Y축 역순
            ticks={yTicks}
            stroke="#6B7280"
            tick={{ fill: "#6B7280" }}
            label={{
              value: "",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#6B7280" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
            }}
            formatter={(value: any, name: string, props: any) => {
              const payload = props?.payload;
              if (!payload) return ["", ""];
              
              const originalPosition = payload.originalPosition;
              if (typeof originalPosition === "string") {
                return [originalPosition, `${payload.round}R`];
              }
              return [`${originalPosition}위`, `${payload.round}R`];
            }}
            // labelFormatter={(label: string | number) => `${label}R`}
          />
          {/* 전체 선: displayPosition을 사용하여 NC도 표시되도록 함 */}
          {chartData.length > 1 && (
            <Line
              type="monotone"
              dataKey="displayPosition"
              stroke={getTeamColor(driverNumber)}
              strokeWidth={5}
              dot={<CustomDot />}
              activeDot={{ r: 8 }}
              connectNulls={true}
            />
          )}
      
          {/* 데이터가 1개인 경우 */}
          {chartData.length === 1 && (
            <Line
              type="monotone"
              dataKey="displayPosition"
              stroke={getTeamColor(driverNumber)}
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{ r: 8 }}
              connectNulls={true}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
  
    </div>
  );
}

