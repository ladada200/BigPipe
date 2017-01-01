# PROJECT BigPipe

## OUTLINE:

##### __GOAL__
To create a cluster based single node script; wherein the following occurs:
 1. Script waits on listening port for TCP command.
 2. Once command is received, instruction is evaluated based on complexity.
 3. Instruction is then distributed from Master to slaves (machines/servers) on pre-determined TCP port unlesss.
 4. Slaves enter ready state and return ready command.
 5. Ready for instructions and load the Master then sends password for salt to Slaves.
 6. Slaves cache password and return new ready state and OK open for instruction.
 7. Master cuts input into pieces based on available and idle nodes. (complexity is based upon byte block size)
 8. Input is threaded and encrypted with password distributed earlier per each Slave.
 9. Threads shift from encryption phase to distribution phase.
 10. Each thread is then connected via TCP to each available Slave.
  * Remaining Slaves are sent instructions in additional rounds based on available threads from Master.
 11. Each TCP connection creates a UDP connection as well on a randomly generated port.
 12. Each Slave returns UDP port to Master.
 13. Master begins distributing chunks encrypted with pre-determined password(s) and instructions to all Slaves required for operation.
 14. Slaves decrypt chunk and begin instructions sent with chunk.
 15. Upon completion the following occurs:
  1. Raw Answer is sent with designated thread number and Slave node ID to Master.
  2. Master places answer in segmented line waiting for all parts.
  3. Slave clears cache and any temporary data.
  4. Slave returns to ready state.
  5. If Master is not able to receieve Chunk, Chunk is considered missing and we begin the process again from **4. in main process.**
 16. Master reassembles Chunks in order.
  1. 

##### __RESPONSIVENESS__
To properly display project maintenance and usage a web-based dashboard will be used during development and possibly during final release.
