package bowlingKata;

public class RegularFrame extends Frame
{	
	public RegularFrame(Roll firstRoll, Roll secondRoll)
	{
		super(firstRoll, secondRoll);
	}

	protected Score score()
	{
		return new Score(rolls.get(0).nbPins() + rolls.get(1).nbPins());
	}
}
