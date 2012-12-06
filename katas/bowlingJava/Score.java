package bowlingKata;

public class Score
{

	private int value;

	public Score(int value)
	{
		this.value = value;
	}

	public int value()
	{
		return value;
	}

	public Score plus(Score score)
	{
		return new Score(value() + score.value());
	}

	@Override
	public int hashCode()
	{
		final int prime = 31;
		int result = 1;
		result = prime * result + value;
		return result;
	}

	@Override
	public boolean equals(Object obj)
	{
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Score other = (Score) obj;
		if (value != other.value)
			return false;
		return true;
	}

	@Override
	public String toString()
	{
		return "Score [value=" + value + "]";
	}

		
	

}
