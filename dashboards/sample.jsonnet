local grafana = import 'grafonnet/grafana.libsonnet';

grafana.dashboard.new(
  title = "My Dashboard",
  editable = true,
  schemaVersion = 21,
)
  .addPanel(
    grafana.text.new(
      content='Yippie',
      mode='markdown',
    ),
    gridPos={
      x: 0,
      y: 0,
      w: 24,
      h: 2,
    },
  )
.addPanel(
  grafana.graphPanel.new(
    title = "My First Graph",
    datasource='-- Grafana --'
  ),
 gridPos = { h: 8, w: 8, x: 0, y: 0 }
)
