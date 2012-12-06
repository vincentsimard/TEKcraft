package bowlingKata;

public class Frame
{

	private int firstRoll;
	private int secondRoll;
	private Frame nextFrame;

	public Frame(int firstRoll, int secondRoll)
	{
		this.firstRoll = firstRoll;
		this.secondRoll = secondRoll;
	}

	public Score scoreForTwoRolls()
	{

		return new Score(firstRoll + secondRoll);
		
	}
	
	public Score scoreForFirstRoll()
	{
		return new Score(firstRoll);
	}

	public boolean isStrike()
	{	
		if (firstRoll == 10)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	public void setNextFrame(Frame frame)
	{
		this.nextFrame = frame;
	}
	
	private boolean hasNextFrame()
	{
		return this.nextFrame != null;
	}

	public Score score()
	{
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

	private Score scoreForStrike()
	{
		Score score = new Score(0);
		
		if (hasNextTwoRolls()) {
			score = new Score(10);
			score = score.plus(scoreForNextTwoRolls());
		}
		
		return score;
	}

	private boolean hasNextTwoRolls()
	{
		if (hasNextFrame()) {
			if (this.nextFrame.isStrike()) {
				if (this.nextFrame.hasNextFrame()) {
					return true;
				}
			} else {
				return true;
			}
		}
		return false;
	}

	private Score scoreForNextTwoRolls()
	{
		Score score = new Score(0);
		
		if (this.nextFrame.isStrike()) {
			Frame secondNextFrame = this.nextFrame.nextFrame;
			score = score.plus(this.nextFrame.scoreForTwoRolls());
			score = score.plus(secondNextFrame.scoreForFirstRoll());
		} else {
			score = score.plus(this.nextFrame.scoreForTwoRolls());
		}
	
		return score;
	}

}
