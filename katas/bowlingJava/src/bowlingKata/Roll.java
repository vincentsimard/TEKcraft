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
		return this.pins;
	}
	
	public boolean allPinsKnockedDown()
	{
		return this.pins == 10;
	}
}