package bowlingKata;

import java.util.ArrayList;
import java.util.List;

public abstract class Frame {

	protected List<Roll> rolls = new ArrayList<Roll>();
	protected Frame nextFrame;
	
	public Frame(Roll firstRoll, Roll secondRoll)
	{
		this.rolls.add(firstRoll);
		this.rolls.add(secondRoll);
	}
	
	public static Frame newFrame(Roll firstRoll, Roll secondRoll) {
		if (firstRoll.allPinsKnockedDown()) {
			return new StrikeFrame();
		} else {
			return new RegularFrame(firstRoll, secondRoll);
		}
	}
	
	public void setNextFrame(Frame frame) {
		this.nextFrame = frame;
	}

	protected boolean hasNextFrame() {
		return nextFrame != null;
	}
	
	public String toString() {
		return "Frame [rolls=[" + Integer.toString(rolls.get(0).nbPins()) + "," + Integer.toString(rolls.get(1).nbPins()) + "]]";
	}

	protected boolean nextFrameIsStrike() {
		return nextFrame.getClass().equals(StrikeFrame.class);
	}

	protected abstract Score score();
}