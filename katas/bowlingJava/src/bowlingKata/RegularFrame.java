package bowlingKata;

import java.util.ArrayList;
import java.util.List;

public class RegularFrame extends Frame
{	
	public RegularFrame(Roll firstRoll, Roll secondRoll)
	{
		super(firstRoll, secondRoll);
	}

	protected Score scoreForStrike()
	{
		Score score = new Score(0);
		
		if (hasNextTwoRolls()) {
			score = new Score(10);
			score = score.plus(scoreForNextTwoRolls());
		}
		
		return score;
	}

	protected List<Roll> nextRolls() {
		List<Roll> nextRolls = new ArrayList<Roll>();
		
		if (hasNextFrame()) {
			if (this.nextFrame.isStrike()) {
				nextRolls.add(this.nextFrame.getFirstRoll());
				if (this.nextFrame.hasNextFrame()) {
					nextRolls.add(this.nextFrame.nextFrame.getFirstRoll());
				}
			} else {
				nextRolls.add(this.nextFrame.getFirstRoll());
				nextRolls.add(this.nextFrame.getSecondRoll());
			}
		}
		
		return nextRolls;
	}
}
