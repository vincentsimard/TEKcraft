package bowlingKata;

import java.util.ArrayList;
import java.util.List;

public class StrikeFrame extends Frame
{

	public StrikeFrame()
	{
		super(new Roll(10), new Roll(0));
	}

	protected Score score()
	{
		if (!hasNextTwoRolls()) { return new Score(); }
		return new Score(10).plus(scoreForNextTwoRolls());
	}
	
	private List<Roll> nextRolls()
	{
		List<Roll> nextRolls = new ArrayList<Roll>();
		
		if (!hasNextFrame()) { return nextRolls; }
		
		nextRolls.add(nextFrame.rolls.get(0));
		
		if (nextFrameIsStrike())
		{
			if (nextFrame.hasNextFrame())
			{
				nextRolls.add(nextFrame.nextFrame.rolls.get(0));
			}
		}
		else
		{
			nextRolls.add(nextFrame.rolls.get(1));
		}
		
		return nextRolls;
	}

	private boolean hasNextTwoRolls()
	{
		List<Roll> nextRolls = nextRolls();
		return nextRolls.size() >= 2;
	}

	private Score scoreForNextTwoRolls()
	{
		Score score = new Score();
		List<Roll> nextRolls = nextRolls();
	
		score = score.plus(new Score(nextRolls.get(0).nbPins()));
		score = score.plus(new Score(nextRolls.get(1).nbPins()));
		
		return score;
	}
}
