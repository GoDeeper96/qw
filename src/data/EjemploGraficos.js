import { 
    BarChartOutlined, 
    BubbleChartOutlined, 
    PieChartOutline, 
    TableChart, 
    StackedBarChartOutlined,
    ShowChartOutlined,
    SsidChartOutlined,
    DonutLargeOutlined,
    RadarOutlined 
  } from "@mui/icons-material";
  
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
      }
  ];