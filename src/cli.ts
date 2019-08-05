import readline from 'readline';

import { Robot } from './robot';

export class RobotRunner {

  private rl: readline.Interface;
  private robot: Robot;

  constructor() {
    this.rl = readline.createInterface(process.stdin, process.stdout);
    this.rl.setPrompt('R0B0T> ');

    this.rl.on('line', this.onLine.bind(this));
    this.rl.on('close', this.onClose.bind(this));

    this.robot = new Robot();
  }

  public run() {
    this.rl.prompt();
  }

  private onLine(line) {
    const input = line.trim();
    const { command, params } = this.getCommand(input);

    try {
      switch (command) {
        case 'place':
          const {x, y, f} = params;
          this.robot.place(Number(x), Number(y), f);
          break;
        case 'move':
          this.robot.move();
          break;
        case 'left':
          this.robot.faceLeft();
          break;
        case 'right':
          this.robot.faceRight();
          break;
        case 'report':
          const reportOut = this.robot.report();
          console.log(`${reportOut.x},${reportOut.y},${reportOut.currentFace}`);
          break;
        default:
          console.error('ERR: Unknown command');
      }
    } catch (error) {
      console.error(`ERR: ${error.message}`);
    }
    this.rl.prompt();
  }

  private onClose() {
    console.log('Program has been terminated');
    process.exit();
  }

  private getCommand(input) {
    if (input.indexOf('place') > -1) {
      const [, params] = input.split(' ');
      const matchPlaceParams = /^\d,\d,[NSEW]$/g;
      if (params) {
        const matchParams = params.match(matchPlaceParams);
        if (matchParams && matchParams.length > 0) {
          const placeParams = matchParams[0].split(',');
          return {
            command: 'place',
            params: {
              f: placeParams[2],
              x: placeParams[0],
              y: placeParams[1],
            },
          };
        }
      }
      return {
        command: undefined,
      };

    } else if (input.indexOf('move') > -1) {
      return {
        command: 'move',
      };
    } else if (input.indexOf('left') > -1) {
      return {
        command: 'left',
      };
    } else if (input.indexOf('right') > -1) {
      return {
        command: 'right',
      };
    } else if (input.indexOf('report') > -1) {
      return {
        command: 'report',
      };
    } else {
      return { command: undefined };
    }
  }
}
