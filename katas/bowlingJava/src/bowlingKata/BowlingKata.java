package bowlingKata;

import static org.junit.Assert.*;
import static org.hamcrest.core.Is.*;
import org.junit.Test;

public class BowlingKata
{

	@Test
	public void gutterGameHasScore0()
	{
		assertThat(bowlingGame(new int[][] { {0,0}, {0,0}, {0,0}, {0,0}, {0,0}, {0,0}, {0,0}, {0,0}, {0,0}, {0,0} }), is(new Score(0)));
	}
	
	@Test
	public void scoreAddsMultipleRolls()
	{
		assertThat(bowlingGame(new int[][] { {3,2} }), is(new Score(5)));
	}
	
	@Test
	public void scoreAddsMultipleFrames()
	{
		assertThat(bowlingGame(new int[][] {{3,2}, {4,5}}), is(new Score(14)));
	}
	
	@Test
	public void strikesAddNextTwoRolls()
	{
		assertThat(bowlingGame(new int[][] {{10,0}, {4,5}}), is(new Score(28)));
		assertThat(bowlingGame(new int[][] {{10,0}, {10,0}, {4,5}}), is(new Score(52)));
	}
	
	@Test
	public void strikesCannotBeScoredUntilNextTwoRolls()
	{
		assertThat(bowlingGame(new int[][] {{4,5}, {10, 0}}), is(new Score(9)));
		assertThat(bowlingGame(new int[][] {{4,5}, {10, 0}, {10, 0}}), is(new Score(9)));
	}
	
//	@Test
//	public void shouldOnlyHaveToRollOnceFirstRollIsStrike()
//	{
//		assertThat(bowlingGame(new int[][] {{10}}), is(new Score(0)));
//	}
	
	private Score bowlingGame(int[][] pinsKnockedDown)
	{
		Game game = new Game();
		
		for(int i = 0; i < pinsKnockedDown.length; i++)
		{
			Frame frame = Frame.newFrame(new Roll(pinsKnockedDown[i][0]), new Roll(pinsKnockedDown[i][1]));
			game.roll(frame);
		}
		
		return game.score();
	}

}
