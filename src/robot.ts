const debug = require('debug')('robot'); // tslint:disable-line

export enum Face {
  North,
  South,
  East,
  West,
}

export class Robot {
  private size: number;
  private border: number;
  private isPlaced: boolean;
  private currentFace: Face;
  private currentX: number;
  private currentY: number;

  constructor(size: number = 5) {
    this.size = size;
    this.border = this.size - 1;
    this.isPlaced = false;
  }

  public place(x: number, y: number, face: string) {
    if (this.isPlaced) {
      this.robotAlreadyPlaced();
      return;
    }

    if (Number(x) > this.border || Number(y) > this.border) {
      this.robotOutOfBounds();
    }

    this.currentX = x;
    this.currentY = y;
    this.currentFace = this.convertFaceString(face);
    this.isPlaced = true;

    this.debug();
  }

  public move() {
    if (!this.isPlaced) {
      this.robotPlacementMissing();
      return;
    }

    switch (this.currentFace) {
      case Face.North:
        this.moveUp();
        break;
      case Face.South:
        this.moveDown();
        break;

      case Face.East:
        this.moveRight();
        break;

      case Face.West:
        this.moveLeft();
        break;

      default:
        throw new Error('undefined current face');
    }

    this.debug();
  }

  public moveUp() {
    if (this.currentY < this.border) {
      this.currentY++;
    } else {
      debug('reached border of North');
    }
  }

  public moveDown() {
    if ((this.currentY) > 0) {
      this.currentY--;
    } else {
      debug('reached border of South');
    }
  }

  public moveRight() {
    if (this.currentX < this.border) {
      this.currentX++;
    } else {
      debug('reached border of East');
    }
  }

  public moveLeft() {
    if (this.currentX > 0) {
      this.currentX--;
    } else {
      debug('reached border of west');
    }
  }

  public faceLeft() {
    if (!this.isPlaced) {
      this.robotPlacementMissing();
      return;
    }

    switch (this.currentFace) {
      case Face.North:
        this.currentFace = Face.West;
        break;
      case Face.South:
        this.currentFace = Face.East;
        break;
      case Face.East:
        this.currentFace = Face.North;
        break;
      case Face.West:
        this.currentFace = Face.South;
        break;
      default:
        throw new Error('undefined current face');
    }
    this.debug();
  }

  public faceRight() {
    if (!this.isPlaced) {
      this.robotPlacementMissing();
      return;
    }
    switch (this.currentFace) {
      case Face.North:
        this.currentFace = Face.East;
        break;
      case Face.South:
        this.currentFace = Face.West;
        break;
      case Face.East:
        this.currentFace = Face.South;
        break;
      case Face.West:
        this.currentFace = Face.North;
        break;
      default:
        throw new Error('undefined current face');
    }
    this.debug();
  }

  public report() {
    if (!this.isPlaced) {
      this.robotPlacementMissing();
      return;
    }

    const params = {
      currentFace: this.convertFace(this.currentFace),
      isPlaced: this.isPlaced,
      x: this.currentX,
      y: this.currentY,
    };

    debug(`${params.x},${params.y},${params.currentFace}`);
    return params;
  }

  private convertFaceString(faceString: string): Face {
    switch (faceString.toUpperCase()) {
      case 'N':
        return Face.North;
      case 'S':
        return Face.South;
      case 'E':
        return Face.East;
      case 'W':
        return Face.West;
      default:
        throw new Error('Face direction is not valid');
    }
  }

  private convertFace(face: Face): string {
    switch (face) {
      case Face.North:
        return 'N';
      case Face.South:
        return 'S';
      case Face.East:
        return 'E';
      case Face.West:
        return 'W';
      default:
        throw new Error('Face direction is not valid');
    }
  }

  private robotPlacementMissing() {
    throw new Error('Robot is not yet placed');
  }

  private robotAlreadyPlaced() {
    throw new Error('Robot is already placed');
  }

  private robotOutOfBounds() {
    throw new Error('Robot placement out of bounds');
  }

  private debug() {
    const params = {
      currentFace: this.convertFace(this.currentFace),
      isPlaced: this.isPlaced,
      x: this.currentX,
      y: this.currentY,
    };

    debug('debugline:', params);
  }
}
