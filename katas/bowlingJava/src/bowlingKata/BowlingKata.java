package bowlingKata;

import static org.junit.Assert.*;
import static org.hamcrest.core.Is.*;
import org.junit.Test;

public class BowlingKata
{

	@Test
	public void gutter_game_has_score_0()
	{
		assertThat(bowlingGame(new int[][] { {0,0}, {0,0}, {0,0}, {0,0}, {0,0}, {0,0}, {0,0}, {0,0}, {0,0}, {0,0} }), is(new Score(0)));
	}
	
	@Test
	public void score_is_calculated_by_adding_rolls()
	{
		assertThat(bowlingGame(new int[][] { {3,2} }), is(new Score(5)));
	}
	
	@Test
	public void score_is_calculated_by_adding_multiple_frames()
	{
		assertThat(bowlingGame(new int[][] {{3,2}, {4,5}}), is(new Score(14)));
	}
	
	@Test
	public void strikes_adds_pins_of_next_two_rolls()
	{
		assertThat(bowlingGame(new int[][] {{10,0}, {4,5}}), is(new Score(28)));
		assertThat(bowlingGame(new int[][] {{10,0}, {10,0}, {4,5}}), is(new Score(52)));
	}
	
	@Test
	public void strikes_cannot_be_scored_until_next_two_rolls()
	{
		assertThat(bowlingGame(new int[][] {{4,5}, {10, 0}}), is(new Score(9)));
		assertThat(bowlingGame(new int[][] {{4,5}, {10, 0}, {10, 0}}), is(new Score(9)));
	}
	
//	@Test
//	public void should_only_have_to_roll_once_in_frame_when_strike()
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
