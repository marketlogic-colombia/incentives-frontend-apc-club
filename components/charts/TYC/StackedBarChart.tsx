import React, { FC } from "react";
import ReactEcharts from "echarts-for-react";

const totalDatas = [
  {
    total: 400,
    totalColor: "#eb1000",
    expected: 600,
    expectedColor: "#828282",
  },
  {
    total: 300,
    totalColor: "#eb1000",
    expected: 600,
    expectedColor: "#828282",
  },
  {
    total: 350,
    totalColor: "#eb1000",
    expected: 600,
    expectedColor: "#828282",
  },
  {
    total: 250,
    totalColor: "#eb1000",
    expected: 600,
    expectedColor: "#828282",
  },
];

interface Props {
  totalDatas:
    | {
        total: number;
        expected: number;
        totalColor: string;
        expectedColor: string;
      }[]
    | any[];
  yNames: string[] | null;
}

const StackedBarChart: FC<Props> = ({
  totalDatas = [{ total: 0, expected: 0, totalColor: "", expectedColor: "" }],
  yNames = ["NOLA", "SOLA", "Brazil, Mexico"],
}) => {
  const totalData = totalDatas?.map((item) => ({
    value: item.total,
    itemStyle: { color: item.totalColor },
  }));

  const expectedData = totalDatas?.map((item) => ({
    value:
      Number(item.total) > Number(item.expected)
        ? 0
        : Number(item.expected - item.total).toFixed(0),
    itemStyle: { color: item.expectedColor },
    aux: item.expected,
  }));

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        const totalValue = params[0].data.value;
        const expectedValue = params[1].data.aux;
        return `Signed: ${formatValue(totalValue)} / Expected: ${formatValue(
          expectedValue
        )} - Progress: ${Number((totalValue / expectedValue) * 100).toFixed(
          2
        )}%`;
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: function (value: any) {
          if (value >= 1000000) {
            return (value / 1000000).toFixed(0) + "M";
          } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + "K";
          } else {
            return value?.toFixed(0);
          }
        },
      },
    },
    yAxis: {
      type: "category",
      data: yNames,
    },
    series: [
      {
        name: "",
        type: "bar",
        stack: "total",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        data: totalData,
      },
      {
        name: "",
        type: "bar",
        stack: "total",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        data: expectedData,
      },
    ],
  };
  const formatValue = (value: any) => {
    return value >= 1000000
      ? (value / 1000000).toFixed(2) + "M"
      : value >= 1000
      ? (value / 1000).toFixed(2) + "K"
      : value;
  };
  return (
    <div className="w-full">
      <ReactEcharts option={option} className="w-auto h-auto" />
    </div>
  );
};

export default StackedBarChart;
