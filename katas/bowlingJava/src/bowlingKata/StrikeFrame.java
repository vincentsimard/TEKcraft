package bowlingKata;

import java.util.ArrayList;
import java.util.List;

public class StrikeFrame extends Frame {

	public StrikeFrame() {
		super(new Roll(10), new Roll(0));
	}

	@Override
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

	@Override
	protected Score scoreForStrike() {
		Score score = new Score(0);
		
		if (hasNextTwoRolls()) {
			score = new Score(10);
			score = score.plus(scoreForNextTwoRolls());
		}
		
		return score;
	}

}
