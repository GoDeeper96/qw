import { FunnelPlotFilled, FunnelPlotOutlined } from "@ant-design/icons";
import { 
    BarChartOutlined, 
    BubbleChartOutlined, 
    PieChartOutline, 
    TableChart, 
    StackedBarChartOutlined,
    ShowChartOutlined,
    SsidChartOutlined,
    DonutLargeOutlined,
    RadarOutlined, 
    PartyModeOutlined,
    StackedBarChartRounded,
    StackedBarChartTwoTone,
    ScatterPlot
  } from "@mui/icons-material";
import { FaStackExchange, FaStackOverflow } from "react-icons/fa";
import { IoFunnelSharp } from "react-icons/io5";
import { PiAirplaneLandingThin, PiFunnelSimpleXThin } from "react-icons/pi";
import { TbPyramid, TbStack3Filled } from "react-icons/tb";
  
  export const ExGraficos = [
      {
          label: 'Cuadrícula',
          name: 'Cuadricula',
          Familia: 'Table',
          Tipo: 'Table',
          icono: <TableChart sx={{ height: '2.5rem', width: '1.5rem' }} />
      },
      {
          label: 'Gráfico de Barras',
          name: 'GraficoBarra',
          Familia: 'Chart',
          Tipo: 'Bar',
          icono: <BarChartOutlined sx={{ height: '2.5rem', width: '1.5rem' }} />
      },
      {
          label: 'Gráfico de Líneas',
          name: 'GraficoLinea',
          Familia: 'Chart',
          Tipo: 'Line',
          icono: <ShowChartOutlined sx={{ height: '2.5rem', width: '1.5rem' }} />
      },
      {
          label: 'Gráfico de Áreas',
          name: 'GraficoArea',
          Familia: 'Chart',
          Tipo: 'Area',
          icono: <SsidChartOutlined sx={{ height: '2.5rem', width: '1.5rem' }} />
      },
      {
          label: 'Gráfico de Burbujas',
          name: 'GraficoBurbuja',
          Familia: 'Chart',
          Tipo: 'Bubble',
          icono: <BubbleChartOutlined sx={{ height: '2.5rem', width: '1.5rem' }} />
      },
      {
          label: 'Gráfico de Pie',
          name: 'GraficoPie',
          Familia: 'Chart',
          Tipo: 'Pie',
          icono: <PieChartOutline sx={{ height: '2.5rem', width: '1.5rem' }} />
      },
      {
          label: 'Gráfico de Rosca',
          name: 'GraficoRosca',
          Familia: 'Chart',
          Tipo: 'Doughnut',
          icono: <DonutLargeOutlined sx={{ height: '2.5rem', width: '1.5rem' }} />
      },
      {
          label: 'Gráfico de Radar',
          name: 'GraficoRadar',
          Familia: 'Chart',
          Tipo: 'Radar',
          icono: <RadarOutlined sx={{ height: '2.5rem', width: '1.5rem' }} />
      },
      {
          label: 'Gráfico de Barras Apiladas',
          name: 'GraficoBarrasApiladas',
          Familia: 'Chart',
          Tipo: 'StackingBar',
          icono: <StackedBarChartOutlined sx={{ height: '2.5rem', width: '1.5rem' }} />
      },

      {
        label: 'Funnel',
        name: 'Funnel',
        Familia: 'Chart',
        Tipo: 'Funnel',
        icono: <FunnelPlotOutlined sx={{ height: '2.5rem', width: '1.5rem' }} />
    },
    {
        label: 'Piramide',
        name: 'Piramide',
        Familia: 'Chart',
        Tipo: 'Pyramid',
        icono: <TbPyramid sx={{ height: '2.5rem', width: '1.5rem' }} />
    },
    {
        label: 'Pareto',
        name: 'Pareto',
        Familia: 'Chart',
        Tipo: 'Pareto',
        icono: <PartyModeOutlined sx={{ height: '2.5rem', width: '1.5rem' }} />
    },
    {
        label: 'Scatter',
        name: 'Scatter',
        Familia: 'Chart',
        Tipo: 'Scatter',
        icono: <ScatterPlot sx={{ height: '2.5rem', width: '1.5rem' }} />
    },
    {
        label: 'StackingArea',
        name: 'StackingArea',
        Familia: 'Chart',
        Tipo: 'StackingArea',
        icono: <StackedBarChartRounded sx={{ height: '2.5rem', width: '1.5rem' }} />
    },
    {
        label: 'StackingColumn',
        name: 'StackingColumn',
        Familia: 'Chart',
        Tipo: 'StackingColumn',
        icono: <TbStack3Filled sx={{ height: '2.5rem', width: '1.5rem' }} />
    },
    {
        label: 'StackingBar100',
        name: 'StackingBar100',
        Familia: 'Chart',
        Tipo: 'StackingBar100',
        icono: <StackedBarChartTwoTone sx={{ height: '2.5rem', width: '1.5rem' }} />
    },
    {
        label: 'StackingArea100',
        name: 'StackingArea100',
        Familia: 'Chart',
        Tipo: 'StackingArea100',
        icono: <FaStackOverflow sx={{ height: '2.5rem', width: '1.5rem' }} />
    },
    {
        label: 'StackingColumn100',
        name: 'StackingColumn100',
        Familia: 'Chart',
        Tipo: 'StackingColumn100',
        icono: <FaStackExchange sx={{ height: '2.5rem', width: '1.5rem' }} />
    },
  ];