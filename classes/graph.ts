export class GraphData {
  private timestampRange: string[] = ["8:30pm", "", "", "9:30 pm"];
  private values: number[] = [0, 0, 0, 0];
  public lineChartData = [
    {
      data: [65, 2, 70, 80, 90, 70, 70, 270],
      label: "Rainbow Six Siege"
    },
    { data: [28, 70, 2, 70, 70, 70, 70, 70], label: "Far Cry 5" },
    {
      data: [280, 400, 2, 70, 800, 70, 70, 90],
      label: "Assassin’s Creed Odyssey"
    }
  ];
  public lineChartLabels = ["8:30pm", "", "", "", "", "", "", "9:30 pm"];
  constructor() {}

  getGraphData() {
    return {
      lineChartData: this.lineChartData,
      lineChartLabels: this.lineChartLabels
    };
  }
  updateValue(timestamp: string, value: number) {
    for (let i in this.timestampRange) {
      if (this.timestampRange[i] === timestamp) {
        this.values[i] = value;
      }
    }
    return this.getGraphData();
  }
}
