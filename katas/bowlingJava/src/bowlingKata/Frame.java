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
	
	protected Roll getFirstRoll() {
		return rolls.get(0);
	}

	protected Roll getSecondRoll() {
		return rolls.get(1);
	}

	public Score scoreForTwoRolls() {
		return new Score(getFirstRoll().nbPins() + getSecondRoll().nbPins());
	}

	public Score scoreForFirstRoll() {
		return new Score(getFirstRoll().nbPins());
	}

	public void setNextFrame(Frame frame) {
		this.nextFrame = frame;
	}

	protected boolean hasNextFrame() {
		return this.nextFrame != null;
	}

	protected boolean hasNextTwoRolls() {
		List<Roll> nextRolls = nextRolls();
		return nextRolls.size() >= 2;
	}

	protected Score scoreForNextTwoRolls() {
		Score score = new Score(0);
		List<Roll> nextRolls = nextRolls();
	
		score = score.plus(new Score(nextRolls.get(0).nbPins()));
		score = score.plus(new Score(nextRolls.get(1).nbPins()));
		
		return score;
	}
	
	protected abstract List<Roll> nextRolls();

	protected boolean isStrike() {	
		return getFirstRoll().allPinsKnockedDown();
	}

	protected abstract Score scoreForStrike();

	public Score score() {
		Score score = new Score(0);
	
		if (isStrike())
		{
			score = scoreForStrike();
		} 
		else
		{
			score = scoreForTwoRolls();
		}
		
		return score;
	}
}