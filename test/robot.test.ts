import * as chai from 'chai';
import 'mocha';

import { Robot } from '../src/robot';

const expect = chai.expect;

describe('Robot - Setup', () => {
  it('robot placement within boundaries', (done) => {
    const robot = new Robot();
    robot.place(0, 0, 'N');

    const { currentFace, isPlaced, x, y } = robot.report();
    expect(currentFace).to.equal('N');

    done();
  });

  it('robot placement out of boundaries', (done) => {
    const robot = new Robot();

    try {
      robot.place(10, 0, 'N');

    } catch (error) {
      expect(error.message).to.equal('Robot placement out of bounds');
      done();
    }
  });

  it('valid face direction', (done) => {
    const robot = new Robot();

    robot.place(0, 0, 'W');

    const { currentFace, isPlaced, x, y } = robot.report();
    expect(currentFace).to.equal('W');
    expect(isPlaced).to.equal(true);
    expect(x).to.equal(0);
    expect(y).to.equal(0);
    done();
  });

  it('invalid face direction', (done) => {
    const robot = new Robot();

    try {
      robot.place(0, 0, 'X');
    } catch (error) {
      expect(error.message).to.equal('Face direction is not valid');
      done();
    }
  });
});

describe('Robot - Scenarios', () => {

  it('place and move two steps', (done) => {
    const robot = new Robot();
    robot.place(2, 0, 'N');

    robot.move();
    robot.move();

    const { currentFace, isPlaced, x, y } = robot.report();

    expect(currentFace).to.equal('N');
    expect(isPlaced).to.equal(true);
    expect(x).to.equal(2);
    expect(y).to.equal(2);

    done();
  });

  it('place and try to place again', (done) => {
    const robot = new Robot();

    try {
      robot.place(2, 0, 'N');
      robot.place(2, 0, 'N');
    } catch (error) {
      expect(error.message).to.equal('Robot is already placed');
      done();
    }
  });

  it('place and move to outside boundaries', (done) => {
    const robot = new Robot();
    robot.place(2, 2, 'E');

    robot.move();
    robot.move();
    robot.move();
    robot.move();
    robot.move();
    robot.move();
    robot.move();
    robot.move();
    robot.move();
    robot.move();

    const { currentFace, isPlaced, x, y } = robot.report();

    expect(currentFace).to.equal('E');
    expect(isPlaced).to.equal(true);
    expect(x).to.equal(4);
    expect(y).to.equal(2);

    done();
  });

  it('place, rotate and move', (done) => {
    const robot = new Robot();
    robot.place(2, 2, 'W');

    robot.faceLeft();
    robot.move();

    const { currentFace, isPlaced, x, y } = robot.report();

    expect(currentFace).to.equal('S');
    expect(isPlaced).to.equal(true);
    expect(x).to.equal(2);
    expect(y).to.equal(1);

    done();
  });

  it('place, rotate and move outside boundaries', (done) => {
    const robot = new Robot();
    robot.place(1, 3, 'S');

    robot.faceRight();
    robot.faceRight();
    robot.move();
    robot.move();
    robot.move();
    robot.move();
    robot.move();
    robot.move();
    robot.move();

    const { currentFace, isPlaced, x, y } = robot.report();

    expect(currentFace).to.equal('N');
    expect(isPlaced).to.equal(true);
    expect(x).to.equal(1);
    expect(y).to.equal(4);
    done();
  });

  it('place, rotate, move, rotate, move outside boundaries', (done) => {
    const robot = new Robot();
    robot.place(4, 4, 'N');

    robot.faceLeft();
    robot.move();
    robot.move();

    robot.faceLeft();
    robot.move();
    robot.move();
    robot.move();
    robot.move();
    robot.move();
    robot.move();

    const { currentFace, isPlaced, x, y } = robot.report();

    expect(currentFace).to.equal('S');
    expect(isPlaced).to.equal(true);
    expect(x).to.equal(2);
    expect(y).to.equal(0);
    done();
  });

});
