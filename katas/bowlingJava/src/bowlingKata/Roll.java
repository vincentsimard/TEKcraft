package bowlingKata;

public class Roll
{
	public int pins;

	public Roll()
	{
		this.pins = 0;
	}
	
	public Roll(int pins)
	{
		this.pins = pins;
	}
	
	public int nbPins()
	{
		return pins;
	}
	
	public boolean allPinsKnockedDown()
	{
		return pins == 10;
	}
}